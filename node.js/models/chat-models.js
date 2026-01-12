import mongoose from "mongoose";

const chatSchema= new mongoose.Schema({
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Request",
    unique:true
  },
  participants:{
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    required: true,
    validate:{
      validator: function (v){
        return v.length===2;
      }
    }
    
  },
}, 
{timestamps: true}
)

const Chat=mongoose.model("Chat", chatSchema)