import mongoose from "mongoose";

const categoriesSchema= new mongoose.Schema({
  name:{
    type: String,
    required: true,
    validate:{
      validator: function (v){
        return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(v)
      }
    },
    trim: true,
    uppercase: true
  },
  description:{
    type: String
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  is_deleted:{
    type: Boolean,
    default: false
  },
  deleted_at:{
    type: Date,
    default: null
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
},
{timestamps: true}
)
categoriesSchema.index(
  { name: 1, is_deleted: 1 },
  { unique: true }
);
const Category=mongoose.model("Category", categoriesSchema);
export default Category;

