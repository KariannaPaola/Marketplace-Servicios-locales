/**
 * Controladores de autenticación y gestión de usuarios.
 *
 * Este módulo maneja:
 * - Registro de usuarios con validaciones de email y contraseña
 * - Verificación de correo electrónico mediante token
 * - Inicio de sesión con JWT
 * - Recuperación de contraseña vía email
 * - Cambio de contraseña usando token de recuperación
 *
 * Dependencias principales:
 * - MongoDB (Mongoose)
 * - JSON Web Tokens (JWT)
 * - Crypto para generación de tokens seguros
 * - Servicio de envío de correos
 * - Variables de entorno configuradas con dotenv
 *
 * Variables de entorno requeridas:
 * - JWT_SECRET
 * - JWT_EXPIRES_IN
 *
 * Uso típico en Express:
 *   import {
 *     registerUser,
 *     verifyEmail,
 *     loginUser,
 *     recoverPassword,
 *     changePassword
 *   } from "./auth.controller.js";
 *
 * @module authController
 */

import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";
import sendEmail  from "../services/email.service.js";
import crypto from 'crypto';
import jwt from "jsonwebtoken"


export const auth = async (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    user_type: req.user.user_type,
  });
}

export const registerUser = async (req, res) => {
  const {name, lastname, email: rawEmail, phone_number, password, password_repeat, user_type} =req.body;
  const email = rawEmail.toLowerCase();

  try {
    let user= await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Ya estas registrado' });
    if (password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            "La contraseña debe tener al menos una mayuscula, un numero y un caracter especial",
        });
      }
    }
    if (password!==password_repeat) return res.status(400).json({ message: 'Las contraseñas deben ser iguales' });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Ingrese un correo válido",
        });
      }
    const token_email= crypto.randomBytes(32).toString('hex');
    const newUser= new User ({ name, lastname, email, phone_number, password, token_email: token_email, token_email_expires: Date.now() + 1000 * 60 * 60, user_type });
    await newUser.save();
    const link_verificationEmail=`http://localhost:5173/verify-email/${token_email}`;
    await sendEmail ({ to:email, subject:"Verifica tu correo", html: `<a href="${link_verificationEmail}">Verificar cuenta</a>` })
    return res.status(200).json({
      message: "Debes verificar tu correo, revisa tu bandeja de entrada"
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al registrar usuario", 
    });
  }
};

export const verifyEmail = async (req, res) => {
  const {token} =req.params;

  try {
    let user= await User.findOne({ token_email: token });
    if (!user) {
      const alreadyVerified = await User.findOne({ token_email: null, is_email_verified: true });
      if (alreadyVerified) {
        return res.status(200).json({ msg: "Email verificado correctamente" });
      }
      return res.status(400).json({ msg: "Token inválido" });
    }
    if (user.token_email_expires < Date.now()) {
      return res.status(400).json({
        message: "Este enlace ha expirado. Solicita uno nuevo",
      });
    }
    user.is_email_verified=true;
    user.token_email=null;
    user.token_email_expires = null;
    await user.save();
    return res.status(200).json({
      message: "Email verificado correctamente"
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al verificar el correo"
    });
  }
};

export const loginUser = async (req, res) => {
  const {email: rawEmail, password} = req.body;
  const email = rawEmail.toLowerCase();

  try{
    if (!email || !password) {
      return res.status(400).json({
      message: "Email y contraseña son obligatorios",
    });
    }
    let user= await User.findOne({ email});
    if (!user) return res.status(400).json({ message: 'Usuario no existente' });
    if (user.is_deleted) return res.status(400).json({ message: 'Usuario suspendido, comuniquese con soporte' });
    const isMatch= await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
    const token= jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: {
      id: user._id,
      name: user.name,
      email: user.email,
      user_type: user.user_type, 
    }});
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}

export const recoverPassword= async (req, res) => {
  const {email: rawEmail} = req.body;
  const email = rawEmail.toLowerCase();
  const link=process.env.FRONT_URL
  try{
    if (!email) {
      return res.status(400).json({
      message: "Email obligatorio",
    });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No hay un usuario registrado con ese correo' });
    const token_recoverPassword= crypto.randomBytes(32).toString('hex');
    user.token_recover_password= token_recoverPassword;
    await user.save();
    const link_recoverPassword=`${link}/ChangePassword/${token_recoverPassword}`;
    await sendEmail ({ to:email, subject:"Recupera tu cotraseña", html: `<a href="${link_recoverPassword}">Cambiar contraseña</a>` })
    res.json({ message:'Revisa tu correo y entra al enlace para cambiar tu contraseña' })

  } catch (error) {
    res.status(500).json({ 
    message: "Error al recuperar contraseña" 
    });
  }
}

export const changePassword= async (req, res) => { 
  const {token} =req.params;
  const {newPassword}=req.body;
  const {newPassword_repeat}=req.body;
  if (newPassword !==newPassword_repeat) return res.status(400).json({ message: 'Las contraseñas deben ser iguales' });
  
  try {
    const user = await User.findOne({ token_recover_password: token });
    if (!user) return res.status(400).json({ msg: 'no hay un token asociado a ese usuario' });
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          'Debes verificar tu correo, revisa tu bandeja de entrada',
        });
      }  
    user.password= newPassword;
    await user.save();
    res.json({ message:'contraseña cambiada exitosamente' })
  }catch (error) {
    res.status(500).json({ 
    message: "Error al cambiar contraseña"
  });
  }
}