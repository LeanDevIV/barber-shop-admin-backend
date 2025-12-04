import { Schema, model } from "mongoose";

const BarbershopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    config: {
      appointmentDurationDefault: Number, // minutos
      maxAdvance: Number, // días
      cancelationMinimum: Number, // horas
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  },
  { timestamps: true }
);
BarbershopSchema.index({ email: 1 }, { unique: true });
BarbershopSchema.index({ owner: 1 }, { unique: true });
export const BarbershopModel = model("barberShop", BarbershopSchema);
