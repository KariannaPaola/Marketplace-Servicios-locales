import dotenv from 'dotenv';
dotenv.config();
import Fee from '../models/fees.models.js';
import { recalcProviderVisibility } from "../services/providerVisibility.service.js";


export const paymentRegister= async (req, res) => {
  const {id} = req.params;
  const user=req.user;
  const {payment_reference}=req.body;

  try{
    if (!id) {
      return res.status(400).json({ message: "no hay una solicitud asociada a eta tarifa" });
    }
    if (!payment_reference) {
      return res.status(400).json({ message: "debes ingresar la referencia de pago emitida por tu banco" });
    }
    const fee=await Fee.findOne({ request_Id: id, status: { $in: ["pendiente", "rechazado"] } });
    if (!fee) return res.status(404).json({message:'tarifa no encontrada'});
    if (user._id.toString() !== fee.provider_Id.toString()) return res.status(403).json({message:'no estas autorizado para pagar esta tarifa'});
    fee.status = "pagado";
    fee.payment_reference=payment_reference;
    fee.date_payment = new Date();
    fee.updated_by=user._id
    await fee.save();

    return res.status(200).json({
      message: "referencia de pago de tarifa enviada con exito, revisaremos el comprobante para validar el pago",
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al pagar tarifa", 
    error: error.message || error.toString() 
    });
  }
}

export const listAllFees= async (req, res) => {
  const {status, provider_Id} = req.query;

  try{
    
    const filter={};
    if (status && !["pendiente", "aprobado", "rechazado", "pagado"].includes(status)) {
    return res.status(400).json({ message: 'status invalido' });
}
    if (provider_Id && !mongoose.Types.ObjectId.isValid(provider_Id))
    return res.status(400).json({ message: 'id invalido' })
    
    if (status) filter.status= status;
    if (provider_Id) filter.provider_Id= provider_Id;

    const fee=await Fee.find(filter)
      .populate('provider_Id', 'name lastname') 
      .select('provider_Id amount_bs payment_reference status expiration_date date_payment')
    if (fee.length === 0) return res.status(404).json({message:'no se encontraron tarifas'});
    return res.status(200).json({ fees: fee });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al mostrar tarifas", 
    error: error.message || error.toString() 
    });
  }
}

export const myFees= async (req, res) => {
  const {status} = req.query;
  const user=req.user;

  try{
    const filter={provider_Id:user._id};
    if (status && !["pendiente", "aprobado", "rechazado", "pagado"].includes(status)) {
      return res.status(400).json({ message: 'status invalido' });
    }

    if (status) filter.status= status;

    const fee=await Fee.find(filter)
      .populate('request_Id', 'details') 
      .select('amount_bs payment_reference status expiration_date date_payment')
    if (fee.length === 0) return res.status(404).json({message:'no se encontraron tarifas'});
    return res.status(200).json({ fees: fee });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al mostrar tarifas", 
    error: error.message || error.toString() 
    });
  }
}

export const approveFee= async (req, res) => {
  const {id} = req.params;
  const user=req.user;

  try{
    if (!user) return res.status(401).json({ message: "Usuario no autenticado" });
    if (!id) {
      return res.status(400).json({ message: "no existe esta tarifa" });
    }
    const fee=await Fee.findOne({ _id: id, status: { $in: ["pendiente", "rechazado"] } });
    if (!fee) return res.status(404).json({message:'tarifa no encontrada'});
      fee.status="aprobado"; 
      fee.updated_by=user._id
      await fee.save();
      await recalcProviderVisibility(fee.provider_Id);
      return res.status(200).json({
        message: 
        "referencia de pago de tarifa aprobada"
    }); 
  } catch (error) {
    res.status(500).json({ 
    message: "Error al aprobar tarifa", 
    error: error.message || error.toString() 
    });
  }
}

export const disapproveFee= async (req, res) => {
  const {id} = req.params;
  const user=req.user;

  try{
    if (!user) return res.status(401).json({ message: "Usuario no autenticado" });
    if (!id) {
      return res.status(400).json({ message: "no existe esta tarifa" });
    }
    const fee=await Fee.findOne({ _id: id, status: { $in: ["pendiente", "rechazado"] } });
    if (!fee) return res.status(404).json({message:'tarifa no encontrada'});
      fee.status ="rechazado"; 
      fee.updated_by=user._id
      await fee.save();
      await recalcProviderVisibility(fee.provider_Id);
      return res.status(200).json({
        message: 
        "referencia de pago de tarifa rechazada"
    }); 
  } catch (error) {
    res.status(500).json({ 
    message: "Error al rechazar tarifa", 
    error: error.message || error.toString() 
    });
  }
}
