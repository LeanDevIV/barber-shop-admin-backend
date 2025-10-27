import { Schema, model } from "mongoose";
import argon2 from "argon2";

const UsersSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Ingrese un email válido",
      ],
    },
    userRole: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false, // No incluir en las consultas por defecto
    },
  },
  { timestamps: true }
);

// Middleware para hashear la contraseña antes de guardar
UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
UsersSchema.methods.comparePassword = async function (candidatePassword) {
  return await argon2.verify(this.password, candidatePassword);
};

export const UserModel = model("user", UsersSchema);
