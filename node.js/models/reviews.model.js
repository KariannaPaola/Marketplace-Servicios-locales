import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Request"
  },
  client_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  provider_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  rating:{
    type: Number,
    min: 1,
    max: 5,
    required:true
  },
  comment:{
    type: String,
    maxlength: 500,
    trim: true
  },
  reported: { 
    type: Boolean, 
    default: false 
  }, 
  reported_by: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
  },
  reported_at: {
  type: Date,
  default: null
  },
  visible:{ 
    type: Boolean, 
    default: true 
  },
  is_deleted:{
    type: Boolean,
    default: false,
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{timestamps: true}
)
reviewSchema.index({ request_Id: 1 }, { unique: true });
const Review=mongoose.model("Review", reviewSchema)
export default Review;