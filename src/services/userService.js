import { UserModel } from "../models/Users.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro_123";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Registra un nuevo usuario
 */
export const registerUser = async (userData) => {
  try {
    // Verificar si ya existe un usuario con ese email o username
    const existingUser = await UserModel.findOne({
      $or: [
        { userEmail: userData.userEmail },
        { userName: userData.userName },
      ],
    });

    if (existingUser) {
      throw new Error("El email o nombre de usuario ya está registrado");
    }

    // Crear el nuevo usuario
    const newUser = new UserModel(userData);
    await newUser.save();

    // Generar token JWT
    const token = jwt.sign(
      { userId: newUser._id, userRole: newUser.userRole },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      user: {
        id: newUser._id,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
        userRole: newUser.userRole,
      },
      token,
    };
  } catch (error) {
    throw new Error("Error al registrar usuario: " + error.message);
  }
};

/**
 * Inicia sesión de un usuario
 */
export const loginUser = async (email, password) => {
  try {
    // Buscar usuario con password incluido
    const user = await UserModel.findOne({ userEmail: email }).select(
      "+password"
    );

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id, userRole: user.userRole },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
      },
      token,
    };
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};

/**
 * Verifica si un token JWT es válido y devuelve el usuario
 */
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

/**
 * Obtiene un usuario por su ID
 */
export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    throw new Error("Error al obtener usuario: " + error.message);
  }
};

/**
 * Obtiene todos los usuarios
 */
export const getAllUsers = async () => {
  try {
    return await UserModel.find().select("-password");
  } catch (error) {
    throw new Error("Error al obtener usuarios: " + error.message);
  }
};

/**
 * Actualiza un usuario
 */
export const updateUser = async (userId, updateData) => {
  try {
    // Si se está actualizando la contraseña, ya se hasheará por el pre-save hook
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      throw new Error("Usuario no encontrado");
    }

    return updatedUser;
  } catch (error) {
    throw new Error("Error al actualizar usuario: " + error.message);
  }
};

/**
 * Elimina un usuario
 */
export const deleteUser = async (userId) => {
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return { message: "Usuario eliminado exitosamente" };
  } catch (error) {
    throw new Error("Error al eliminar usuario: " + error.message);
  }
};

