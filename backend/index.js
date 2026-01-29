import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import corsInstance from "./config/cors.js";
import usersRoutes from "./routes/users.router.js";
import authRoutes from "./routes/auth.routes.js";
import providersRoutes from "./routes/provider.routes.js";
import servicesRoutes from "./routes/service.routes.js";
import requestRoutes from "./routes/request.routes.js";
import feesRoutes from "./routes/fee.routes.js";
import reviewsRoutes from "./routes/review.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import statesRoutes from "./routes/states.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import messagesRoutes from "./routes/message.routes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(corsInstance);


await connection();

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/providers", providersRoutes);
app.use("/services", servicesRoutes);
app.use("/requests", requestRoutes);
app.use("/fees", feesRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/states", statesRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messagesRoutes);






app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});