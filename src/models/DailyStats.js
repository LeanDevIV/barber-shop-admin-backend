import { Schema, model } from "mongoose";

const DailyStatsSchema = new Schema(
  {
    //Barbershop
    barbershop: { type: Schema.ObjectId, ref: "barberShop" },
    date: { type: Date, required: true },
    //Revenue
    TotalRevenue: Number,
    revenueByMethod: {
      cash: Number,
      card: Number,
      transfer: Number,
    },
    //Services
    totalServices: Number,
    mostPopularService: [
      {
        service: { type: Schema.Types.ObjectId, ref: "service" },
        quantity: Number,
        total: Number,
      },
    ],
    //Employees
    performanceByEmployee: [
      {
        employee: { type: Schema.Types.ObjectId, ref: "user" },
        total: Number,
        services: Number,
        comissions: Number,
      },
    ],
    //Appointments
    totalAppointments: Number,
    appointmentsCancelled: Number,
    appointmentsConfirmed: Number,
    appointmentsPending: Number,
  },
  { timestamps: true }
);
DailyStatsSchema.index({ barbershop: 1, date: -1 }, { unique: true });
export const DailyStatsModel = model("dailyStats", DailyStatsSchema);
