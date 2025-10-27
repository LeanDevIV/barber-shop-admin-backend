import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!URI) {
      throw new Error("MONGO_URI no está definida en las variables de entorno");
    }
    
    await mongoose.connect(URI);
    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.error("❌ Error al conectar DB:", error.message);
    process.exit(1); // Termina el proceso si no puede conectar
  }
};
