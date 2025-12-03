import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    barbershop: { type: Schema.ObjectId, ref: "barberShop" },
    client: { type: Schema.ObjectId, ref: "user" },
    barber: { type: Schema.ObjectId, ref: "user" },
    service: { type: Schema.ObjectId, ref: "service" },
    appointment: { type: Schema.ObjectId, ref: "appointment" },
    amount: Number,
    paymentDate: Date,
    paymentMethod: { type: String, enum: ["cash", "card", "transfer"] },
    paymentStatus: { type: String, enum: ["pending", "paid", "cancelled"] },
    paymentReference: String, // ID de MercadoPago, etc.
    //Comissions
    barberCommission: Number,
    barberShopCommission: Number,
    //Tracking
    total: Number,
    totalBarber: Number,
    totalBarberShop: Number,
    //
  },
  { timestamps: true }
);

export const PaymentModel = model("payment", PaymentSchema);
