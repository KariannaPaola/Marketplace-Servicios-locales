import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";
import sendEmail  from "../services/email.service.js";
import crypto from 'crypto';


export const registerUser = async (req, res) => {
  const {name, lastname, email: rawEmail, phone_number, password, password_repeat} =req.body;
  const email = rawEmail.toLowerCase();
  try {
    let user= await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Usuario ya existe' });
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
    const token_email= crypto.randomBytes(32).toString('hex');
    const newUser= new User ({ name, lastname, email, phone_number, password, token_email: token_email });
    await newUser.save();
    const link_verificationEmail=`http://localhost:3000/users/verify/${token_email}`;
    await sendEmail ({ to:email, subject:"Verifica tu correo", html: `<a href="${link_verificationEmail}">Verificar cuenta</a>` })
    res.json({ message:'Debes verificar tu correo, revisa tu bandeja de entrada' })
  } catch (error) {
    res.status(500).json({ 
    message: "Error al crear usuario", 
    error: error.message || error.toString() 
    });
  }
};

export const verifyEmail = async (req, res) => {
  const {token} =req.params;
  try {
    let user= await User.findOne({ token_email: token });
    if (!user) return res.status(400).json({msg: 'Ingrese un token valido' })
    user.is_email_verified=true;
    user.token_email=null;
    await user.save();
    return res.status(200).json({
      msg: "Email verificado correctamente"
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al verificar el correo", 
    error: error.message || error.toString() 
    });
  }
};

export const loginUser = async (req, res) => {
  const {email, password} = req.body
  try{
    let user= await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no existente' });
    const isMatch= await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });
    const token= jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const recoverPassword= async (req, res) => {
  const {email} = req.body;
  try{
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'No hay un usuario registrado con ese correo' });
    const token_recoverPassword= crypto.randomBytes(32).toString('hex');
    user.token_recover_password= token_recoverPassword;
    await user.save();
    const link_recoverPassword=`http://localhost:3000/users/changePassword/${token_recoverPassword}`;
    await sendEmail ({ to:email, subject:"Recupera tu cotraseña", html: `<a href="${link_recoverPassword}">cambiar contraseña</a>` })
    res.json({ message:'revisa tu correo y entra al enlace para cambiar tu contraseña' })

  } catch (error) {
    res.status(500).json({ 
    message: "Error al recuperar contraseña", 
    error: error.message || error.toString() 
    });
  }
}

export const changePassword= async (req, res) => { 
  const {token} =req.params;
  const {newPassword}=req.body;
  const {newPassword_repeat}=req.body;
  if (newPassword !==newPassword_repeat) return res.status(400).json({ message: 'Las contraseñas deben ser iguales' });
  try{
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
    message: "Error al cambiar contraseña", 
    error: error.message || error.toString() 
  });
  }
}