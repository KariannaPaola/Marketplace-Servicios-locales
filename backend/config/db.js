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
    
    const dbUri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI;

    await mongoose.connect(dbUri);
    console.log(`Conectado a MongoDB en ${dbUri}`);
  } catch (error) {
    console.error("Error de conexión:", error.message);
    process.exit(1); 
  }
};

export default connection;