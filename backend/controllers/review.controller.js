import dotenv from 'dotenv';
dotenv.config();
import Provider from '../models/provider.models.js';
import Request from '../models/request.models.js';
import Review from '../models/reviews.model.js';
import { recalculateProviderReputation } from '../services/reputation.service.js';


export const createReview= async (req, res) => {
  const user=req.user;
  const {rating, comment} =  req.body;
  const {requestId}= req.params
  try{
    const parsedRating = Number(rating);
    if (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        message: "La puntuación debe ser un número entre 1 y 5"
      });
    }
    if (!requestId) {
      return res.status(400).json({ message: "no se encontro la solicitud asociada a la reseña" });
    }
    const request=await Request.findOne({_id: requestId, client_Id: user._id, status:"completado" });
    if (!request) {
      return res.status(403).json({ message: "no se encontro la solicitud o no puede ser reseñada" });
    }
    const reviewExist=await Review.findOne({request_Id: requestId});
    if (reviewExist) {
      return res.status(400).json({ message: "ya realizaste una reseña sobre esta solicitud" });
    }
    const newReview = await Review.create({
      request_Id: requestId,
      client_Id: user._id ,
      provider_Id: request.provider_Id,
      rating: parsedRating,
      comment: comment || null
    });
    await recalculateProviderReputation(request.provider_Id);
    return res.status(201).json({
    message: "Reseña creada exito",
    review: newReview
  });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al crear reseña", 
    error: error.message || error.toString() 
    });
  }
}

export const getReviews = async (req, res) => {
  const {providerId} =req.params
  try {
    if (!providerId) {
      return res.status(400).json({ message: "no se encontro un proveedor" });
    }
    const provider=await Provider.findOne({ user_Id: providerId});
    if (!provider) {
      return res.status(400).json({ message: "no se encontro un proveedor en la base de datos" });
    }
    const filter = {provider_Id: providerId, visible: true, is_deleted: false };
    const reviews = await Review.find(filter)
      .populate('client_Id', 'name lastname') 
      .populate('provider_Id', 'name lastname')
      .select('rating comment createdAt')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar reseñas' });
  }
};

export const getReviewsAdmin = async (req, res) => {
  const {providerId} =req.params
  try {
    if (!providerId) {
      return res.status(400).json({ message: "no se encontro un proveedor" });
    }
    const provider=await Provider.findOne({ user_Id: providerId});
    if (!provider) {
      return res.status(400).json({ message: "no se encontro un proveedor en la base de datos" });
    }
    const filter = {provider_Id: providerId};
    const reviews = await Review.find(filter)
      .populate('client_Id', 'name lastname') 
      .populate('provider_Id', 'name lastname')
      .select('rating comment createdAt')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar reseñas' });
  }
};

export const getReviewsReported = async (req, res) => {
  const {providerId} =req.params
  try {
    if (!providerId) {
      return res.status(400).json({ message: "no se encontro un proveedor" });
    }
    const filter = {provider_Id: providerId,  reported:true};
    const reviews = await Review.find(filter)
      .populate('client_Id', 'name lastname') 
      .populate('provider_Id', 'name lastname')
      .select('rating comment createdAt')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar reseñas reportadas' });
  }
};

export const reportReview = async (req, res) => {
  const {id} =req.params
  const user=req.user;
  try {
    if (!id) {
      return res.status(400).json({ message: "no se encontro la reseña" });
    }
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Reseña no encontrada" });
    if (review.reported) {
    return res.status(400).json({ message: "La reseña ya fue reportada" });
    }
    if (review.client_Id.toString() === user._id.toString()) {
    return res.status(403).json({ message: "No puedes reportar tu propia reseña" });
    }
    await Review.updateOne(
    { _id: id },
    { reported: true,
      reported_by: user._id,
      reported_at: new Date()
    }
  );
    return res.status(201).json({
    message: "Reseña reportada exito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al reportar la reseña' });
  }
};

export const verifyReviewsReportedAdmin = async (req, res) => {
  const {idReview} =req.params;
  const {isValidReported}=req.body
  try {
    if (!idReview) {
      return res.status(400).json({ message: "no se encontro ninguna reseña" });
    }
    if (typeof isValidReported !== "boolean") {
    return res.status(400).json({
    message: "isValidReported debe ser boolean"
    });
    }
    const review=await Review.findOne({_id: idReview, reported:true});
    if (!review) {
      return res.status(400).json({ message: "no se encontro la reseña" });
    }
    if (isValidReported===false) {
      review.reported=false;
      review.visible=true;
      await review.save();
    }
    if (isValidReported===true) {
      review.reported=false;
      review.visible=false;
      await review.save();
    }
    return res.status(201).json({
    message: "Reseña revisada con exito",
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al verifiar reseña' });
  }
};
