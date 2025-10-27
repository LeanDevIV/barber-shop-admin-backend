import { Router } from "express";
import appointmentRoutes from "./appointmentRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/citas", appointmentRoutes);
router.use("/usuarios", userRoutes);
//router.use("/estadisticas",dashboardRoutes);
//router.use("/servicios",serviceRoutes);

export default router;