import express from "express";
import cors from "cors";
import router from "./routes/indexRoutes.js";
import { connectDB } from "./config/db.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

let app;

export async function buildApp() {
  if (app) return app;

  // Conectar a la DB una sola vez
  await connectDB();

  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Montar rutas: en Vercel la función ya vive bajo /api, así evitamos /api/api
  const mountPath = process.env.VERCEL ? "/" : "/api";
  app.use(mountPath, router);

  // Middlewares de error
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
