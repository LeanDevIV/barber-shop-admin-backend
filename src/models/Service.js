import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // Duración en minutos
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", ServiceSchema);


//Listar los servicios ofrecidos (ej. corte, color, afeitado).

//Agregar nuevos servicios.

//Modificar nombre, precio y duración.

//Eliminar servicios obsoletos.

