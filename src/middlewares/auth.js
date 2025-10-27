import { verifyToken } from "../services/userService.js";

/**
 * Middleware para verificar el token JWT
 */
export const authenticateToken = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token de acceso requerido" });
    }

    // Verificar el token
    const decoded = verifyToken(token);

    // Agregar la información del usuario al objeto request
    req.userId = decoded.userId;
    req.userRole = decoded.userRole;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

/**
 * Middleware para verificar si el usuario es admin
 */
export const requireAdmin = async (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso denegado. Se requieren privilegios de administrador." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

