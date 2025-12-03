import { Schema, model } from "mongoose";
import argon2 from "argon2";

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Ingrese un email válido",
      ],
    },
    role: {
      type: String,
      enum: ["owner", "employee", "client"],
      default: "client",
    },
    active: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    barberShop: {
      type: Schema.Types.ObjectId,
      ref: "barberShop",
    },
    commission: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false, // No incluir en las consultas por defecto
    },
    especialty: {
      type: Schema.Types.ObjectId,
      ref: "service",
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
