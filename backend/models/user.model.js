import mongoose from "mongoose";
import { bycrytMiddleware } from "../middlewares/bcrypt.js";
import bcrypt from "bcryptjs";

export const userSchema= new mongoose.Schema({
  name:{
    type: String,
    required: true,
    validate:{
      validator: function (v){
        return /^[A-Za-zñÑáéíóúÁÉÍÓÚ'-\s]+$/.test(v)
      }
    }
  },
  lastname:{
    type: String,
    required: true,
    validate:{
      validator: function (v){
        return /^[A-Za-zñÑáéíóúÁÉÍÓÚ'-\s]+$/.test(v)
      }
    }
  },
  email:{
    type: String,
    unique: true,
    required: true,
    validate:{
      validator: function (v){
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
      }
    }
  },
  phone_number:{
    type: String,
    required: true,
    validate:{
      validator: function (v){
        return /^\+58(212|412|414|424|416|426)[0-9]{7}$/.test(v)
      }
    }
  },
  user_type:{
    type: String,
    enum: {
    values: ["cliente", "proveedor", "administrador"],
    message: "Tipo de usuario inválido"
  },
    required: true,
    default: "cliente",
  },
  password:{
    type: String,
    required: true,
  },
  token_recover_password:{
    type: String,
    default: null,
  },
  is_email_verified:{
    type: Boolean,
    default: false,
  },
  token_email:{
    type: String
  },
  token_email_expires:{
    type: Date,
    default: null,
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
  },
},
{timestamps: true}
)
userSchema.pre("save", bycrytMiddleware);

userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User=mongoose.model("User", userSchema);
export default User;
