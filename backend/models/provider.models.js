import mongoose from "mongoose";

const providerSchema= new mongoose.Schema({
  user_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique:true,
    ref: "User"
  },
  profession:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  categories:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  state:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true
  },
  rating:{
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  ratingCount: {
  type: Number,
  default: 0
  },
  services_offered: {
  type: [
    {
      name_service: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ],
  validate: {
    validator: 
    function (v){
      return v?.length > 0}
      },
  required: true,
},
  membership_premium:{
    type: {
      active:{
        type: Boolean,
        default:false
      },
      start_date:{
        type: Date,
        default: null
      },
      end_date:{
        type: Date,
        default: null
      }
    },
    default: {}
  },
  profile_visible:{
    type: Boolean,
    default: true,
  },
  status: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending"
  },
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  is_deleted:{
    type: Boolean,
    default: false,
  },
  deleted_at:{
    type: Date,
    default: null,
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }
},
{timestamps: true}
)
providerSchema.index({ categories: 1, is_deleted: 1 });
const Provider=mongoose.model("Provider", providerSchema)
export default Provider;