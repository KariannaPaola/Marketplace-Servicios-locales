import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
  chat_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat"
  },
  sender_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  content:{
    type: String,
    required: true,
  },
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: false
  },
} 
)

const Message=mongoose.model("Message", messageSchema)
export default Message;