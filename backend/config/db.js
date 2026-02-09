/**
 * Módulo de conexión a la base de datos MongoDB usando Mongoose.
 *
 * Este archivo:
 * - Carga las variables de entorno desde un archivo `.env`
 * - Establece una conexión asíncrona a MongoDB usando Mongoose
 * - Muestra un mensaje en consola si la conexión es exitosa
 * - Finaliza el proceso si ocurre un error crítico de conexión
 *
 * Requiere:
 * - Variable de entorno `MONGO_URI` definida en el archivo `.env`
 *
 * Uso típico:
 *   import connection from "./db.js";
 *   connection();
 *
 * @module databaseConnection
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error de conexión:", error.message);
    process.exit(1);
  }
};

export default connection;