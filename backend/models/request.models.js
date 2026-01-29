import mongoose from "mongoose";

const requestSchema= new mongoose.Schema({
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
  details:{
    type: {
      name_service:{
        type: String,
        required:false
      },
      description:{
        type: String,
        default:null
      },
      date:{
        type: Date,
        required:false
      }
    },
  },
  status:{
    type: String,
    required: true,
    enum: ["pendiente", "en_curso", "completado","cancelado"],
    default: "pendiente"
  },
  hiring_date:{
    type: Date,
    default: null
  },
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
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
  is_deleted:{
    type: Boolean,
    default: false,
  },
},
{timestamps: true}
)

const Request=mongoose.model("Request", requestSchema);
export default Request;
