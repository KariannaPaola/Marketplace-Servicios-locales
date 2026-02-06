import mongoose from "mongoose";

const filesSchema= new mongoose.Schema({
  sender_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  type: {
      type: String,
      enum: ["cedula", "fotoDeFrente"],
      required: true
    },
  files: [
    {
      filename: String,
      path: String,
      url: String
    }
  ],
},
{timestamps:true} 
)

const File=mongoose.model("file", filesSchema)
export default File;