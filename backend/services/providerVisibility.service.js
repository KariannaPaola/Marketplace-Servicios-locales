/**
 * Función para recalcular la visibilidad del perfil de un proveedor.
 *
 * Este módulo verifica si el proveedor tiene tarifas (fees) vencidas o
 * no aprobadas y actualiza su visibilidad en el sistema.
 *
 * Comportamiento:
 * - Si el proveedor tiene tarifas vencidas o no aprobadas, su perfil
 *   se oculta (`profile_visible = false`).
 * - Si todas las tarifas están aprobadas y al día, su perfil es visible
 *   (`profile_visible = true`).
 *
 * @module RecalcProviderVisibility
 * @function recalcProviderVisibility
 * @param {string} providerId - ID del proveedor cuyo perfil se va a recalcular.
 * @returns {Promise<void>} No retorna valor, actualiza el estado en la base de datos.
 * @throws {Error} Puede lanzar errores de conexión o actualización de la base de datos.
 */

import Fee from "../models/fees.models.js";
import Provider from "../models/provider.models.js";

export const recalcProviderVisibility = async (providerId) => {
  const hasExpiredFees = await Fee.exists({
    provider_Id: providerId,
    status: { $ne: "aprobado" },
    expiration_date: { $lt: new Date() },
  });

  await Provider.updateOne(
    { user_Id: providerId },
    { profile_visible: !hasExpiredFees }
  );
};