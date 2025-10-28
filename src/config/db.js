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

    // Opciones optimizadas para serverless y MongoDB Atlas
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000, // Timeout de 5s para evitar timeouts largos
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0, // Deshabilitar buffer de Mongoose
      bufferCommands: false,
      maxPoolSize: 1, // Pool pequeño para serverless
    });

    console.log("✅ Base de datos conectada");
    
    // Manejar desconexiones de manera elegante
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de conexión MongoDB:', err);
    });
    
  } catch (error) {
    console.error("❌ Error al conectar DB:", error.message);
    throw error;
  }
};
