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
    },
    duration: {
      type: Number,
      required: true,
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

export const ServiceModel = model("service", ServiceSchema);
