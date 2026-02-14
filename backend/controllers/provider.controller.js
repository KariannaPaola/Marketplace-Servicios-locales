/**
 * Controladores para la gestión de proveedores.
 *
 * Este módulo permite:
 * - Registrar un usuario como proveedor
 * - Editar perfil de proveedor
 * - Leer perfil propio o de otro proveedor visible
 * - Eliminar perfil de proveedor
 * - Listar proveedores con paginación y filtros (clientes y admins)
 * - Aprobar o desaprobar proveedores (administradores)
 *
 * Reglas y consideraciones:
 * - Solo usuarios no proveedores pueden registrarse como proveedores
 * - Los perfiles eliminados se marcan como invisibles y se actualiza user_type a "cliente"
 * - Solo proveedores con profile_visible=true y status="approved" se muestran a clientes
 * - Los administradores pueden ver todos los proveedores y controlar su estado
 *
 * Dependencias:
 * - Modelos Provider y User (MongoDB / Mongoose)
 * - Variables de entorno cargadas con dotenv
 *
 * Uso típico en Express:
 *   import {
 *     registerProvider,
 *     editProfileProvider,
 *     readMyProfileProvider,
 *     readProfileProvider,
 *     deletedMyProfileProvider,
 *     getProviders,
 *     getProvidersAdmin,
 *     disapproveProvider,
 *     approveProvider
 *   } from "./provider.controller.js";
 *
 * @module providerController
 */

import dotenv from 'dotenv';
dotenv.config();
import Provider from '../models/provider.models.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const registerProvider= async (req, res) => {
  const user=req.user;
  const { profession, description, direction, categories, state, services_offered} =  req.body;

  try{
    if (!user) {
    return res.status(401).json({ message: "No autenticado" });
    }
    if (user.user_type==="proveedor") return res.status(400).json({message:'ya estas registrado como proveedor',});
    const newProvider= new Provider ({ user_Id:user._id , profession, description, direction, categories, state, services_offered });
    await newProvider.save();
    await User.findByIdAndUpdate(user._id, { user_type: "proveedorPendiente" });
    return res.status(201).json({
      message: "Proveedor registrado correctamente",
      provider: newProvider
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al registrar proveedor", 
    error: error.message
  });
  }
}

export const editProfileProvider= async (req, res) => {
  const id=req.user._id;
  try{
    const profileProvider = await Provider.findOne({ user_Id: id, is_deleted: false  });
    if (!profileProvider) return res.status(404).json({message:'perfil no encontrado',});
    const allowedFields = [
      "profession",
      "description",
      "categories",
      "state",
      "services_offered"
    ];
    const updates = {};
    allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
    });
    Object.assign(profileProvider, updates);
    await profileProvider.save();
    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      profile: profileProvider
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al registrar proveedor", 
      error: error.message 
    });
  }
}

export const readMyProfileProvider= async (req, res) => {
  const user=req.user;
  try{
    const profileProvider = await Provider.findOne({ user_Id: user._id, is_deleted: false })
    .populate("user_Id", "name lastname")
    .populate("categories", "name")
    .populate("state", "name")
    .select("profession description categories state services_offered rating");
    if (!profileProvider) return res.status(404).json({message:'perfil no encontrado'});
    return res.status(200).json(profileProvider);
  } catch (error) {
      res.status(500).json({ 
        message: "Error al obtener perfil", 
        error: error.message
      });
  }
}

export const readProfileProvider= async (req, res) => {
  const {id} = req.params;

  try{
    const profileProvider = await Provider.findOne({ user_Id: id, profile_visible: true, is_deleted:false })
    .populate("user_Id", "name lastname")
    .populate("categories", "name")
    .select("profession description categories services_offered rating");
    console.log("entreee a profile")
    if (!profileProvider) return res.status(404).json({message:'perfil no encontrado',});
    return res.status(200).json(profileProvider);
  } catch (error) {
      res.status(500).json({ 
        message: "Error al obtener perfil", 
        error: error.message 
      });
  }
}

export const deletedMyProfileProvider= async (req, res) => {
  const user=req.user;

  try{
    const profileProvider = await Provider.findOne({ user_Id: user._id, is_deleted: false });
    if (!profileProvider) return res.status(404).json({message:'perfil no encontrado',});
    profileProvider.profile_visible=false;
    profileProvider.is_deleted=true;
    profileProvider.deleted_at= new Date();
    profileProvider.deleted_by= user._id;
    user.user_type = "cliente";
    await user.save();
    await profileProvider.save();
    return res.status(200).json({
      message: "Perfil eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar perfil proveedor" });
  }
}

export const getProviders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      
    const limit = Math.min(parseInt(req.query.limit) || 10, 100); 
    const skip = (page - 1) * limit;   
    const { category, state } = req.query;
    const filter = { is_deleted: false, profile_visible: true, status:"approved"};
    
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.categories = category; 
    } else if (category) {
      console.log("Category ID inválido:", category);
    }

    if (state && mongoose.Types.ObjectId.isValid(state)) {
      filter.state = state;
    } else if (state) {
      console.log("State ID inválido:", state);
    }
    const providers = await Provider.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user_Id', 'name lastname') 
      .populate('categories', 'name')
      .populate('state', 'name')
      .select('profession description rating services_offered membership_premium user_Id categories state status')
      .lean()
      const total = await Provider.countDocuments(filter); 
      console.log({total,providers,page,limit})
      return res.status(200).json({total,providers,page,limit});
  } catch (error) {
  console.error("Error getProviders:", error);
  res.status(500).json({ message: 'Error al listar prestadores', error: error.message });
}
};

export const getProvidersAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      
    const limit = Math.min(parseInt(req.query.limit) || 10, 100); 
    const skip = (page - 1) * limit;   
    const { category, state } = req.query;
    const filter = {};
    if (category) filter.categories = category;
    if (state) filter.state = state;
    const providers = await Provider.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user_Id', 'name lastname') 
      .populate('categories', 'name')
      .populate('state', 'name')
      .select('profession description rating services_offered membership_premium profile_visible status user_Id categories state')
      const total = await Provider.countDocuments(filter);
    return res.status(200).json({total,providers,page,limit});
  } catch (error) {
    res.status(500).json({ message: 'Error al listar prestadores' });
  }
};

export const disapproveProvider = async (req, res) => {
  const {id} = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    } 
    const provider = await Provider.findOne({_id:id})
    if (!provider) return res.status(404).json({message:'Proveedor no encontrado',});
    provider.status="rejected";
    await provider.save()
    return res.status(200).json({message: "proveedor no aprobado"})
  } catch (error) {
      res.status(500).json({ message: 'Error al desaprobar proveedor' });
  }
};

export const approveProvider = async (req, res) => {
  const {id} = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    } 
    const provider = await Provider.findOne({_id: id})
    if (!provider) return res.status(404).json({message:'Proveedor no encontrado',});
    provider.status="approved";
    provider.profile_visible=true;
    console.log("probedor aprobadoooo")
    await provider.save()
    const user= await User.findOne({_id: provider.user_Id})
    user.user_type="proveedor"
    await user.save()
    return res.status(200).json({message: "Proveedor aprobado"})
  } catch (error) {
      res.status(500).json({ message: 'Error al aprobar' });
  }
};



export const getProvidersPublic = async (req, res) => {
  console.log('holssss')
  try {
    const filter = { is_deleted: false, profile_visible: true, status:"approved"}; 
    const providers = await Provider.find(filter)
      .sort({ _id: -1 })
      .populate('user_Id', 'name lastname') 
      .populate('categories', 'name')
      .populate('state', 'name')
      .select('profession description rating services_offered membership_premium user_Id categories state status')
      .lean()
      const total = await Provider.countDocuments(filter); 
      return res.status(200).json({total,providers});
  } catch (error) {
  console.error("Error getProviders:", error);
  res.status(500).json({ message: 'Error al listar prestadores', error: error.message });
}
};