/**
 * Middleware para verificar el estado de las tarifas (fees) de un proveedor.
 *
 * Este módulo permite:
 * - Revisar si el proveedor tiene tarifas pendientes o vencidas
 * - Ocultar el perfil del proveedor automáticamente si existe alguna tarifa vencida
 *
 * Reglas y consideraciones:
 * - Solo se consideran tarifas cuyo estado no sea "verificado"
 * - Una tarifa se considera vencida si su `expiration_date` es menor a la fecha actual
 * - Si existe una tarifa vencida, se actualiza `profile_visible` del proveedor a `false`
 * - Funciona tanto para el proveedor autenticado (`req.user`) como para el proveedor pasado por `req.params.id`
 *
 * Dependencias:
 * - Modelos Fee y Provider (MongoDB / Mongoose)
 *
 * Uso típico en Express:
 *   import { authCheckProviderFees } from './fees.middleware.js';
 *   app.use('/ruta-proveedor', authCheckProviderFees, controlador);
 *
 * @module authCheckProviderFees
 */


import Fee from "../models/fees.models.js";
import Provider from "../models/provider.models.js";
import mongoose from "mongoose";
export const authCheckProviderFees = async (req, res, next) => {
  try {
    const providerId = req.user?._id || req.params.id;
    if (!providerId || !mongoose.Types.ObjectId.isValid(providerId)) {
    return next();
    }
    const expiredFee = await Fee.findOne({
      provider_Id: providerId,
      status: { $ne: "verificado" },
      expiration_date: { $lt: new Date() },
    });
    if (expiredFee) {
      await Provider.updateOne(
        { user_Id: providerId },
        { profile_visible: false }
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};