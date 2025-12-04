import { Schema, model } from "mongoose";

const AppointmentSchema = new Schema(
  {
    barberShop: {
      type: Schema.Types.ObjectId,
      ref: "barberShop",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    barber: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "service",
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    initialTime: {
      type: Date,
      required: true,
    },
    finalTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
      max: [255, "El comentario debe tener menos de 255 caracteres"],
    },
    //tracking
    total: {
      type: Number,
      default: 0,
      min: [0, "El total debe ser mayor a 0"],
    },
  },
  { timestamps: true }
);
AppointmentSchema.index({ barberShop: 1 }, { unique: true });
AppointmentSchema.index({ client: 1 }, { unique: true });
AppointmentSchema.index({ barber: 1 }, { unique: true });
AppointmentSchema.index({ service: 1 }, { unique: true });
export const AppointmentModel = model("appointment", AppointmentSchema);
