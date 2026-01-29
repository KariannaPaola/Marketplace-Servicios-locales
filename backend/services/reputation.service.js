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