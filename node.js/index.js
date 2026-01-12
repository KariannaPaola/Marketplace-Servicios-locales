import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import corsInstance from "./config/cors.js";
import userRoutes from "./routes/users.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(corsInstance);


await connection();

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});