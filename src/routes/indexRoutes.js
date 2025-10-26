import { Router } from "express";
import appointmentRoutes from "./appointmentRoutes.js"

const router = Router();

router.use("/citas",appointmentRoutes);
//router.use("/estadisticas",dashboardRoutes);
//router.use("/servicios",serviceRoutes);

export default router;