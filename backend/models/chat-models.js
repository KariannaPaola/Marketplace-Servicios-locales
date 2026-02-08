import mongoose from "mongoose";

const chatSchema= new mongoose.Schema({
  client_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  provider_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
    unique: true
  },
}, 
{timestamps: true}
)


const Chat=mongoose.model("Chat", chatSchema)
export default Chat;