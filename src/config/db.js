import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!URI) {
      throw new Error("MONGO_URI no está definida en las variables de entorno");
    }
    // Evitar reconectar en entornos serverless: si ya está conectado, reutilizar la conexión
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Base de datos ya conectada (reutilizando conexión)");
      return;
    }

    await mongoose.connect(URI, {
      // Opciones recomendadas por mongoose (pueden ajustarse según versión)
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.error("❌ Error al conectar DB:", error.message);
    // En entornos serverless no forzamos exit; lanzamos para que el caller lo maneje
    throw error;
  }
};
