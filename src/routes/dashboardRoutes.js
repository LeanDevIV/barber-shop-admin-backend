import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController.js";

const router = Router();

// GET /estadisticas/ -> devuelve métricas del dashboard
router.get("/", dashboardController.getDashboard);

export default router;
