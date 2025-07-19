import express from "express";
import cors from "cors"; // ✅ AÑADIR ESTO
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import roleRoutes from "./routes/role.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(cors()); // ✅ AÑADIR ESTO
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/role", roleRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
