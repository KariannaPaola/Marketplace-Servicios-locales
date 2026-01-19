import dotenv from 'dotenv';
dotenv.config();

import Provider from '../models/provider.models.js';

export const registerProvider= async (req, res) => {
  const user=req.user;
  const { profession, description, categories, state, services_offered} =  req.body;
  try{
    if (!user) {
    return res.status(401).json({ message: "No autenticado" });
    }
    if (user.user_type==="proveedor") return res.status(400).json({message:'ya estas registrado como proveedor',});
    const newProvider= new Provider ({ user_Id:user._id , profession, description, categories, state, services_offered});
    await newProvider.save();
    user.user_type= "proveedor";
    await user.save();
    return res.status(201).json({
    message: "Proveedor registrado correctamente",
    provider: newProvider
});
  } catch (error) {
    res.status(500).json({ 
    message: "Error al registrar proveedor", 
    error: error.message || error.toString() 
    });
  }
}


export const editProfile_Provider= async (req, res) => {
  const user=req.user;
  const id=req.params.id;
  try{
    if (id !== user._id.toString()) {
    return res.status(403).json({ message: "acceso denegado" });
    }
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
    error: error.message || error.toString() 
    });
  }
}

export const readMyProfile_Provider= async (req, res) => {
  const user=req.user;
  try{
    const profileProvider = await Provider.findOne({ user_Id: user._id, is_deleted: false })
    .select("profession description categories state services_offered rating");
    if (!profileProvider) return res.status(404).json({message:'perfil no encontrado',});
    return res.status(200).json(profileProvider);
  } catch (error) {
    res.status(500).json({ 
    message: "Error al obtener perfil", 
    error: error.message || error.toString() 
    });
  }
}

export const readProfile_Provider= async (req, res) => {
  const id= req.params.id
  try{
    const profileProvider = await Provider.findOne({ user_Id: id, profile_visible: true, is_deleted:false })
    .populate("categories", "name")
    .select("profession description categories services_offered rating");
    if (!profileProvider) return res.status(404).json({message:'perfil no encontrado',});
    return res.status(200).json(profileProvider);
  } catch (error) {
    res.status(500).json({ 
    message: "Error al obtener perfil", 
    error: error.message || error.toString() 
    });
  }
}

export const deletedMyProfile_Provider= async (req, res) => {
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
    res.status(500).json({ 
    message: "Error al eliminar perfil", 
    error: error.message || error.toString() 
    });
  }
}

export const getProviders = async (req, res) => {
  try {
    const { category, state } = req.query;
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Categoría inválida' });
    }
    if (state && !mongoose.Types.ObjectId.isValid(state)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }
    const filter = { is_deleted: false, profile_visible: true };
    if (category) filter.categories = category;
    if (state) filter.state = state;
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: 'Categoría inválida' });
    }
    if (state && !mongoose.Types.ObjectId.isValid(state)) {
    return res.status(400).json({ message: 'estado inválida' });
    } 
    const providers = await Provider.find(filter)
      .populate('user_Id', 'name lastname') 
      .populate('categories', 'name')
      .populate('state', 'name')
      .select('profession description rating services_offered membership_premium')
      .sort({ 'membership_premium.active': -1 }); 
    res.json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar prestadores' });
  }
};
