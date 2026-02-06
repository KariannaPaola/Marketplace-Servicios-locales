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
    default: null,
    unique: true
  },
}, 
{timestamps: true}
)
chatSchema.index({ userA: 1, userB: 1 },{ unique: true });

const Chat=mongoose.model("Chat", chatSchema)
export default Chat;