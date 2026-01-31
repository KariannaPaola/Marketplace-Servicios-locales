import dotenv from 'dotenv';
dotenv.config();

import User from "../models/user.model.js";
import Provider from '../models/provider.models.js';

export const getUsers = async (req, res) => {
  try {
    
    const page= parseInt(req.query.page|| 1);
    const limit= parseInt(req.query.limit|| 10);
    const skip= (page - 1) * limit
    const { user_type, is_email_verified, is_deleted } = req.query;
    if (user_type && user_type !=="cliente"  && user_type !=="proveedor") {
      return res.status(400).json({ message: 'tipo de usuario invalido' });
    }
    const filter = {user_type: { $in: ['proveedor', 'cliente'] }};
    if (user_type) filter.user_type = user_type;
    if (is_deleted) filter.is_deleted= is_deleted;
    if (is_email_verified !== undefined) filter.is_email_verified = is_email_verified==="true";
    const users = await User.find(filter)
      .sort({ 'name': 1})
      .skip (skip)
      .limit (limit)
      .select('name lastname email phone_number membership_premium user_type is_email_verified is_deleted')
    if (!users.length) return res.status(404).json({message:'ningun usuario encontrado',});
    const total= await User.countDocuments(filter);
    return res.status(200).json({
      total,
      users,
      page,
      limit
    });
  } catch (error) {
      res.status(500).json({ message: 'Error al listar usuarios' });
  }
};


export const getUsersId = async (req, res) => {
  const {id} = req.params;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'no seleciconaste ningun usuario' });
    } 
    const user = await User.findById(id)
      .select('name lastname email phone_number membership_premium user_type is_email_verified')
    if (!user) return res.status(404).json({message:'no hay usuario',});
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar usuario' });
  }
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  const admin=req.user;
  console.log("holaa", req.user);
  try {
    if (!id) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    } 
    const user = await User.findOne({_id:id, is_deleted:false})
    if (!user) return res.status(404).json({message:'Usuario no encontrado',});
    user.is_deleted=true;
    user.deleted_at= new Date();
    user.deleted_by=admin._id
    await user.save()
    if (user.user_type === "proveedor") {
      const provider = await Provider.findOne({ user_Id: user._id});
      if (provider) {
        provider.is_deleted = true;
        provider.profile_visible = false;
        provider.deleted_at = new Date();
        provider.deleted_by = admin._id;
        await provider.save();
      }
    }
    return res.status(200).json({
      message: "usuario eliminado correctamente"})
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

export const unDeleteUser = async (req, res) => {
  const {id} = req.params;
  const admin=req.user;
  try {
    if (!id) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    } 
    const user = await User.findOne({_id: id, is_deleted:true})
    if (!user) return res.status(404).json({message:'Usuario no encontrado',});
    user.is_deleted=false;
    user.deleted_at= null;
    user.deleted_by=null;
    user.updated_by=admin._id;
    await user.save()
    if (user.user_type === "proveedor") {
      const provider = await Provider.findOne({ user_Id: user._id });
      if (provider) {
        provider.is_deleted = false;
        provider.profile_visible = true;
        provider.deleted_at = null;
        provider.deleted_by = null;
        provider.updated_by=admin._id;
        await provider.save();
      }
    }
    return res.status(200).json({
      message: "usuario recuperado correctamente"})
  } catch (error) {
    res.status(500).json({ message: 'Error al recuperar usuario' });
  }
};




