import { Router } from "express";
import * as usuariosController from "../controllers/usuarios.controller.js";
import { authenticateToken, requireAdmin } from "../middlewares/auth.js";

const router = Router();

// Rutas públicas (no requieren autenticación)
router.post("/registro", usuariosController.registrarUsuarioController);
router.post("/login", usuariosController.loginUsuarioController);

// Ruta para obtener el usuario actual (requiere autenticación)
router.get(
  "/me",
  authenticateToken,
  usuariosController.getCurrentUserController
);

// Rutas que requieren autenticación
router.get(
  "/",
  authenticateToken,
  usuariosController.obtenerUsuariosController
);

router.get(
  "/:id",
  authenticateToken,
  usuariosController.obtenerUsuarioPorIdController
);

// Rutas que requieren autenticación y rol de admin
router.post(
  "/",
  authenticateToken,
  requireAdmin,
  usuariosController.crearUsuarioController
);

router.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  usuariosController.editarUsuarioController
);

router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  usuariosController.eliminarUsuarioController
);

export default router;
