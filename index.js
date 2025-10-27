import "dotenv/config";

import express from "express";
import cors from "cors";
import router from "./src/routes/indexRoutes.js";
import { connectDB } from "./src/config/db.js";

import { errorHandler, notFoundHandler } from "./src/middlewares/errorHandler.js";

const startServer = async () => {
  const app = express();

  //conexión a base de datos
  await connectDB();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Routes
  app.use("/api", router);


  // Middleware de errores (debe ir después de las rutas)
  app.use(notFoundHandler);
  app.use(errorHandler);


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer().catch(console.error);
