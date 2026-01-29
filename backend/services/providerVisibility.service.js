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