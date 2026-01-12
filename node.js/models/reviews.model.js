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
    ref: "Provider"
  },
  rating:{
    type: Number,
    min: 1,
    max: 5
  },
  comment:{
    type: String,
    maxlength: 500,
    trim: true
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

const Review=mongoose.model("Review", reviewSchema)
