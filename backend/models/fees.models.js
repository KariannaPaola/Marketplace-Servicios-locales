import mongoose from "mongoose";

const feeSchema= new mongoose.Schema({
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Request",
    unique:true
  },
  provider_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  amount_usd:{
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  amount_bs:{
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },  
  payment_reference:{
    type: String,
    default: null
  },
  status:{
    type: String,
    required: true,
    enum: ["pendiente", "pagado", "aprobado", "rechazado"],
    default: "pendiente"
  },
  expiration_date:{
    type: Date,
    required: true,
  },
  date_payment:{
    type: Date,
    default: null,
  },
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{timestamps: true}
)

const Fee=mongoose.model("Fee", feeSchema);
export default Fee;
