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
      price: Number,
      duration: Number,
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
    },
    //tracking
    total: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "transfer"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const AppointmentModel = model("appointment", AppointmentSchema);
