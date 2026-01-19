import Fee from "../models/fees.models.js";
import Provider from "../models/provider.models.js";

export const authCheckProviderFees = async (req, res, next) => {
  try {
    const providerId = req.user?._id || req.params.id;

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