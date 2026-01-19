import dotenv from 'dotenv';
dotenv.config();
import Provider from '../models/provider.models.js';
import Request from '../models/request.models.js';
import Fee from '../models/fees.models.js';

export const createRequest= async (req, res) => {
  const user=req.user;
  const {provider_Id} =  req.body;
  try{
    if (!provider_Id) {
      return res.status(400).json({ message: "Proveedor requerido" });
    }
    if (user._id.toString()===provider_Id) {
      return res.status(400).json({ message: "No puedes contratatarte a ti mismo" });
    }
    const provider=await Provider.findOne({ user_Id: provider_Id, is_deleted: false, profile_visible: true  });
    if (!provider) return res.status(404).json({message:'Proveedor no encontrado'});
    const activeRequests = await Request.countDocuments({
      client_Id: user._id,
      status: { $in: ["pendiente", "en_curso"] },
      is_deleted: false,
    });

    if (activeRequests >= 3) {
      return res.status(400).json({
        message: "Máximo 3 solicitudes activas permitidas",
      });
    }
      const newRequest = await Request.create({
      client_Id: user._id,
      provider_Id: provider_Id ,
      status: "pendiente",
      details: null,
      hiring_date: null,
    });

    return res.status(201).json({
      message: "Solicitud creada en estado pendiente",
      request: newRequest
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al crear servicio", 
    error: error.message || error.toString() 
    });
  }
}
 
export const formRequest= async (req, res) => {
  const {name_service, description, date} = req.body;
  const { id } = req.params;
  const user=req.user;
  try{
    if (!name_service) {
      return res.status(400).json({ message: "debe ingresar el nombre del servicio" });
    }
    if (!date) {
      return res.status(400).json({ message: "debe ingresar la fecha acordada con el proveedor" });
    }
    if (!id) {
      return res.status(400).json({ message: "debe ingresar una solictud valida" });
    }
    
    const request=await Request.findOne({ _id: id, status: "pendiente" });
    if (!request) return res.status(404).json({message:'solictiud no encontrada'});
    if (request.client_Id.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "no estas autorizado para hacer este formulario" });
    }
    request.details = {
      name_service,
      description: description || null, 
      date,
    };
    
    request.status="en_curso";
    request.hiring_date=new Date();
    request.updated_by = user._id;
    await request.save();

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);

    const newFee = await Fee.create({
      request_Id: id,
      provider_Id: request.provider_Id ,
      amount_usd: 5,
      amount_bs: 5000,
      status: "pendiente",
      expiration_date: expirationDate
    });

    return res.status(201).json({
      message: "Solicitud confirmada en estado en_curso",
      request: request,
      fee: newFee,
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al crear servicio", 
    error: error.message || error.toString() 
    });
  }
}

export const cancelRequest= async (req, res) => {
  const { id } = req.params;
  const user=req.user;
  try{
    if (!id) {
      return res.status(400).json({ message: "debes ingresar una solicitud" });
    }
    
    const request=await Request.findOne({ _id: id, status: { $in: ["pendiente", "en_curso"] } });
    if (!request) return res.status(404).json({message:'solictiud no encontrada'});
    const isClient = request.client_Id.toString() === user._id.toString();
    const isProvider = request.provider_Id.toString() === user._id.toString();

    if (!isClient && !isProvider) {
      return res.status(403).json({
        message: "No estás autorizado para cancelar esta solicitud",
      });
    }
    request.details=null;
    request.status="cancelado";
    request.hiring_date=null;
    request.updated_by = user._id;
    await request.save();


    return res.status(200).json({
      message: "Solicitud cancelada con exito",
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al cancelar servicio", 
    error: error.message || error.toString() 
    });
  }
}

export const completeRequest= async (req, res) => {
  const {id} = req.params;
  const user=req.user;
  try{
    if (!id) {
      return res.status(400).json({ message: "debes ingresar una solicitud" });
    }
    
    const request=await Request.findOne({ _id: id, status: "en_curso"});
    if (!request) return res.status(404).json({message:'solictiud no encontrada'});
    const isClient = request.client_Id.toString() === user._id.toString();
    const isProvider = request.provider_Id.toString() === user._id.toString();

    if (!isClient && !isProvider) {
      return res.status(403).json({
        message: "No estás autorizado para completar esta solicitud",
      });
    }
    
    request.status="completado";
    request.updated_by = user._id;
    await request.save();


    return res.status(200).json({
      message: "Solicitud completada con exito",
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al completar servicio", 
    error: error.message || error.toString() 
    });
  }
}
