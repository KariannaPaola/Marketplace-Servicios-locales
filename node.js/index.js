import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import corsInstance from "./config/cors.js";
import userRoutes from "./routes/users.router.js";
import authRoutes from "./routes/auth.routes.js";
import providersRoutes from "./routes/provider.routes.js";
import servicesRoutes from "./routes/service.routes.js";
import requestRoutes from "./routes/request.routes.js";
import feesRoutes from "./routes/fee.routes.js";
import reviewsRoutes from "./routes/review.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(corsInstance);


await connection();

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/providers", providersRoutes);
app.use("/services", servicesRoutes);
app.use("/requests", requestRoutes);
app.use("/fees", feesRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/categories", reviewsRoutes);




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});