import dotenv from 'dotenv';
dotenv.config();
import State from "../models/states-vzla.models.js";

export const getStates= async (req, res) => {
  try {
    const filter = { active: true };
    const states = await State.find(filter)
    .select('name')
    return res.status(200).json({
      states
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al listar estados' });
  }
};