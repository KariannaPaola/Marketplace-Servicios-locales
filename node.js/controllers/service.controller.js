import dotenv from 'dotenv';
dotenv.config();
import Provider from '../models/provider.models.js';

export const createService= async (req, res) => {
  const user=req.user;
  const { name_service, price} =  req.body;
  try{
    if (!name_service || !price) {
    return res.status(400).json({ message: "debe ingresar el nombre y la tarifa del servicio" });
    }
    const provider = await Provider.findOne({ user_Id: user._id, is_deleted: false });
    if(!provider) return res.status(404).json({ message: "perfil no encontrado" });
    provider.services_offered.push({ name_service, price })
    await provider.save();
    const newService=provider.services_offered[provider.services_offered.length - 1]
    return res.status(201).json({
    message: "servicio agregado correctamente",
    provider: newService
});
  } catch (error) {
    res.status(500).json({ 
    message: "Error al crear servicio", 
    error: error.message || error.toString() 
    });
  }
}

export const editService= async (req, res) => {
  const user=req.user;
  const id=req.params.id;
  const { name_service, price } =  req.body;
  try{
    const provider = await Provider.findOne({ user_Id: user._id, is_deleted: false  });
    if (!provider) return res.status(404).json({message:'perfil no encontrado'});
    const service = provider.services_offered.id(id);
    if (!service) return res.status(404).json({message:'servicio no encontrado'});
    if (name_service !== undefined) service.name_service=name_service;
    if (price !== undefined) service.price=price;
    await provider.save();
    return res.status(200).json({
    message: "servicio actualizado correctamente",
    service: service
});
  } catch (error) {
    res.status(500).json({ 
    message: "Error al editar servicio", 
    error: error.message || error.toString() 
    });
  }
}

export const deleteService= async (req, res) => {
  const user=req.user;
  const id=req.params.id;
  try{
    const provider = await Provider.findOne({ user_Id: user._id, is_deleted: false  });
    if (!provider) return res.status(404).json({message:'perfil no encontrado'});
    const service = provider.services_offered.id(id);
    if (!service) return res.status(404).json({message:'servicio no encontrado'});
    service.remove()
    await provider.save();
    return res.status(200).json({
    message: "servicio eliminado correctamente",
    services: provider.services_offered
});
  } catch (error) {
    res.status(500).json({ 
    message: "Error al eliminar servicio", 
    error: error.message || error.toString() 
    });
  }
}