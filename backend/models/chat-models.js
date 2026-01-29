import mongoose from "mongoose";

const chatSchema= new mongoose.Schema({
  userA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    default: null,
  },
}, 
{timestamps: true}
)
chatSchema.index(
{ userA: 1, userB: 1 },
{ unique: true }
);
const Chat=mongoose.model("Chat", chatSchema)
export default Chat;