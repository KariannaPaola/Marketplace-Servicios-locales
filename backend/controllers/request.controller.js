/**
 * Controladores para la gestión de solicitudes (requests).
 *
 * Este módulo permite:
 * - Poner una solicitud en estado pendiente
 * - Completar el formulario de la solicitud (formRequest)
 * - Cancelar solicitudes por cliente o proveedor
 * - Completar solicitudes en curso
 * - Listar solicitudes de un proveedor o de un cliente con paginación
 *
 * Reglas y consideraciones:
 * - Solo clientes o proveedores involucrados pueden modificar la solicitud
 * - Al completar el formulario, se genera automáticamente una tarifa asociada
 * - Se manejan estados: "creada", "pendiente", "en_curso", "cancelado", "completado"
 * - Se soporta paginación y filtrado por categoría o estado
 *
 * Dependencias:
 * - Modelos Request y Fee (MongoDB / Mongoose)
 * - Variables de entorno cargadas con dotenv
 *
 * Uso típico en Express:
 *   import {
 *     pendingRequest,
 *     formRequest,
 *     cancelRequest,
 *     completeRequest,
 *     getRequestProvider,
 *     getRequestClient
 *   } from "./request.controller.js";
 *
 * @module requestController
 */

import dotenv from 'dotenv';
dotenv.config();
import Request from '../models/request.models.js';
import Fee from '../models/fees.models.js';

export const pendingRequest= async (req, res) => {
  
  const { id } = req.params;
  const user=req.user;

  try{
    if (!id) {
      return res.status(400).json({ message: "debes ingresar una solicitud" });
    }
    const request=await Request.findOne({ provider_Id: id, status: "creada", client_Id: user._id.toString() });
    if (!request) return res.status(404).json({message:'solictiud no encontrada'});
    request.details=null;
    request.status="pendiente";
    request.hiring_date=null;
    request.updated_by = user._id;
    await request.save();
    return res.status(200).json({
      message: "Solicitud en estado pendiente",
      request: request
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: "Error con la solicitud", 
      error: error.message || error.toString() 
    });
  }
}


export const formRequest= async (req, res) => {
  const {name_service, description, date} = req.body;
  const { Id_request } = req.params;
  const user=req.user;

  try{
    if (!name_service) {
      return res.status(400).json({ message: "debe ingresar el nombre del servicio" });
    }
    if (!date) {
      return res.status(400).json({ message: "debe ingresar la fecha acordada con el proveedor" });
    }
    if (!Id_request) {
      return res.status(400).json({ message: "debe ingresar una solictud valida" });
    }
    const request=await Request.findOne({ _id: Id_request, status: "pendiente" });
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
    console.log("holappp")
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);
  
    const newFee = await Fee.create({
      request_Id: Id_request,
      provider_Id: request.provider_Id ,
      amount_usd: 5,
      amount_bs: 5000,
      status: "pendiente",
      expiration_date: expirationDate
    });

    return res.status(201).json({
      message: "Solicitud realizada con éxito",
      request: request,
      fee: newFee
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al crear servicio", 
      error: error.message
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
    const request=await Request.findOne({ _id: id, status: { $in: ["pendiente", "en_curso", "creada"] } });
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
      error: error.message 
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
    if (!isClient && !isProvider) return res.status(403).json({message: "No estás autorizado para completar esta solicitud"});
    request.status="completado";
    request.updated_by = user._id;
    await request.save();
    return res.status(200).json({message: "Solicitud completada con exito"});
  } catch (error) {
    res.status(500).json({ 
      message: "Error al completar servicio", 
      error: error.message 
    });
  }
}

export const getRequestProvider = async (req, res) => {
  const user=req.user;
  const page= parseInt(req.query.page || 1)
  const limit= parseInt(req.query.limit || 10)
  const skip= (page - 1) * limit;

  try {
    const { category, state } = req.query;
    const filter = {provider_Id: user._id};
    if (category) filter.categories = category;
    if (state) filter.state = state;
    const requests = await Request.find(filter)
    .sort ({ _id: -1 })
    .limit (limit)
    .skip (skip)
    .populate('client_Id', 'name lastname') 
    .populate('provider_Id', 'name lastname')
    .populate("chat_Id")
    .select('client_Id provider_Id status details hiring_date')
    const total= await Request.countDocuments(filter)
    return res.status(200).json({total,requests,page,limit});
  } catch (error) {
    res.status(500).json({ message: 'Error al listar solicitudes' });
  }
};

export const getRequestClient = async (req, res) => {
  const page= parseInt(req.query.page || 1)
  const limit= parseInt(req.query.limit || 10)
  const skip= (page - 1) * limit;
  const user=req.user;
  try {
    const { category, state } = req.query;
    const filter = {client_Id: user._id};
    if (category) filter.categories = category;
    if (state) filter.state = state;
    const requests = await Request.find(filter)
    .sort ({ _id: -1 })
    .limit (limit)
    .skip (skip)
    .populate('client_Id', 'name lastname') 
    .populate('provider_Id', 'name lastname')
    .populate("chat_Id")
    .select('client_Id provider_Id status details hiring_date')
    const total= await Request.countDocuments(filter)
    return res.status(200).json({total,requests,page,limit});
  } catch (error) {
    res.status(500).json({ message: 'Error al listar solicitudes' });
  }
};

