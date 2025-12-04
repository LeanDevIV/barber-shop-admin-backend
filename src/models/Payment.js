import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    barbershop: { type: Schema.Types.ObjectId, ref: "barberShop" },
    client: { type: Schema.Types.ObjectId, ref: "user" },
    barber: { type: Schema.Types.ObjectId, ref: "user" },
    service: { type: Schema.Types.ObjectId, ref: "service" },
    appointment: { type: Schema.Types.ObjectId, ref: "appointment" },
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
PaymentSchema.index({ barbershop: 1, paymentDate: -1 });
PaymentSchema.index({ barber: 1, paymentDate: -1 });
PaymentSchema.index({ appointment: 1 });
PaymentSchema.index({ client: 1 });
export const PaymentModel = model("payment", PaymentSchema);
