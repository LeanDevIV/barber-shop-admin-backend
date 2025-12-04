import { Schema, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    barbershop: {
      type: Schema.Types.ObjectId,
      ref: "barberShop",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "El precio debe ser mayor a 0"],
    },
    duration: {
      type: Number,
      required: true,
      min: [0, "La duración debe ser mayor a 0"],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    timesReserved: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
ServiceSchema.index({ barbershop: 1, active: 1 });
ServiceSchema.index({ timesReserved: -1 });
export const ServiceModel = model("service", ServiceSchema);
