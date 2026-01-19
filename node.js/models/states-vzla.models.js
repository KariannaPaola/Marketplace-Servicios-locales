import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  active: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

const State=mongoose.model("State", stateSchema);
export default State;