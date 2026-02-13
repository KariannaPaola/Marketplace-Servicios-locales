/**
 * Función para recalcular la reputación y visibilidad del perfil de un proveedor.
 *
 * Este módulo calcula:
 * - La calificación promedio (`averageRating`) de un proveedor a partir de
 *   todas las reseñas visibles y no eliminadas.
 * - El número total de reseñas válidas (`totalReviews`).
 * - La visibilidad del perfil (`profileVisible`) según la calificación promedio:
 *   el perfil será visible si la calificación promedio es mayor o igual a 2.
 *
 * Posteriormente, actualiza los campos del proveedor en la base de datos:
 * - `rating` → calificación promedio
 * - `ratingCount` → total de reseñas válidas
 * - `profile_visible` → true/false según la calificación
 *
 * @module RecalculateProviderReputation
 * @function recalculateProviderReputation
 * @param {string} providerId - ID del proveedor cuyo perfil se va a recalcular.
 * @returns {Promise<Object>} Objeto con los datos actualizados del proveedor:
 *   - averageRating {number} → calificación promedio
 *   - totalReviews {number} → total de reseñas válidas
 *   - profileVisible {boolean} → visibilidad del perfil
 * @throws {Error} Puede lanzar errores de conexión o actualización en la base de datos.
 */

import Review from "../models/reviews.model.js";
import Provider from "../models/provider.models.js";

export const recalculateProviderReputation = async (providerId) => {
const result = await Review.aggregate([{ 
      $match: { 
        provider_Id: providerId, 
        visible: true, 
        is_deleted: false } },
    { 
      $group: {
        _id: "$provider_Id",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 }
    }
  }
]);

const averageRating = result[0]?.averageRating || 0;
const totalReviews = result[0]?.totalReviews || 0;
const profileVisible= averageRating >= 2 
await Provider.findOneAndUpdate(
  { user_Id: providerId },
  { rating: averageRating, ratingCount: totalReviews, profile_visible: profileVisible }
);

return {
    averageRating,
    totalReviews,
    profileVisible
  };
}