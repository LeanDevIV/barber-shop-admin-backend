import express from "express";
import cors from "cors";
import router from "./routes/indexRoutes.js";
import { connectDB } from "./config/db.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

let app;
let connectionPromise;

export async function buildApp() {
  if (app) return app;

  app = express();
  
  // Configurar CORS para aceptar todos los orígenes (ajusta si es necesario)
  app.use(cors({
    origin: '*',
    credentials: false
  }));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Montar rutas: en Vercel la función ya vive bajo /api, así evitamos /api/api
  const mountPath = process.env.VERCEL ? "/" : "/api";
  app.use(mountPath, router);

  // Middlewares de error
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Conectar a la DB de forma no bloqueante
  if (!connectionPromise) {
    connectionPromise = connectDB().catch(error => {
      console.error('⚠️ Error de conexión (no crítico):', error.message);
    });
    // No esperamos la conexión aquí, se conecta en segundo plano
  }

  return app;
}
