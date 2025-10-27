import * as userService from "../services/userService.js";
import { verifyToken } from "../services/userService.js";

/**
 * Registra un nuevo usuario
 */
export const registrarUsuarioController = async (req, res, next) => {
  try {
    const { userName, userEmail, password, userRole } = req.body;

    // Validaciones básicas
    if (!userName || !userEmail || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const result = await userService.registerUser({
      userName,
      userEmail,
      password,
      userRole: userRole || "usuario",
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Inicia sesión de un usuario
 */
export const loginUsuarioController = async (req, res, next) => {
  try {
    const { userEmail, password } = req.body;

    if (!userEmail || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    const result = await userService.loginUser(userEmail, password);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      ...result,
    });
  } catch (error) {
    // Si es un error de credenciales, devolver 401 en lugar de 500
    if (error.message.includes("Credenciales inválidas")) {
      return res.status(401).json({ message: error.message });
    }
    next(error);
  }
};

/**
 * Obtiene el usuario actual (desde el token JWT)
 */
export const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene todos los usuarios
 */
export const obtenerUsuariosController = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un usuario por ID
 */
export const obtenerUsuarioPorIdController = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

/**
 * Crea un nuevo usuario (con privilegios de admin)
 */
export const crearUsuarioController = async (req, res, next) => {
  try {
    const { userName, userEmail, password, userRole } = req.body;

    if (!userName || !userEmail || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const result = await userService.registerUser({
      userName,
      userEmail,
      password,
      userRole: userRole || "usuario",
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza un usuario
 */
export const editarUsuarioController = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "Usuario actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

/**
 * Elimina un usuario
 */
export const eliminarUsuarioController = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

