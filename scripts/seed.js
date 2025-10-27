import "dotenv/config";
import mongoose from "mongoose";
import { UserModel } from "../src/models/Users.js";
import Service from "../src/models/Service.js";
import { connectDB } from "../src/config/db.js";

/**
 * Datos de prueba para usuarios
 */
const usersData = [
  {
    userName: "admin",
    userEmail: "admin@barbershop.com",
    password: "admin123",
    userRole: "admin",
  },
  {
    userName: "susana_peluquera",
    userEmail: "susana@peluqueria.com",
    password: "facu123",
    userRole: "admin",
  },
  {
    userName: "maria_garcia",
    userEmail: "maria@example.com",
    password: "maria123",
    userRole: "usuario",
  },
  {
    userName: "juan_pedro",
    userEmail: "juan@example.com",
    password: "juan123",
    userRole: "usuario",
  },
  {
    userName: "ana_martinez",
    userEmail: "ana@example.com",
    password: "ana123",
    userRole: "usuario",
  },
];

/**
 * Datos de prueba para servicios
 */
const servicesData = [
  {
    name: "Corte de Cabello",
    description: "Corte de cabello profesional con tijeras y máquina",
    price: 15,
    duration: 30,
    active: true,
  },
  {
    name: "Afeitado Clásico",
    description: "Afeitado tradicional con navaja caliente y toallas",
    price: 20,
    duration: 45,
    active: true,
  },
  {
    name: "Corte + Barba",
    description: "Corte de cabello y arreglo de barba completo",
    price: 25,
    duration: 45,
    active: true,
  },
  {
    name: "Lavado + Peinado",
    description: "Lavado de cabello con productos premium y peinado",
    price: 12,
    duration: 25,
    active: true,
  },
  {
    name: "Tratamiento Capilar",
    description: "Tratamiento reparador y nutritivo para el cabello",
    price: 35,
    duration: 60,
    active: true,
  },
];

/**
 * Función principal para ejecutar el seed
 */
const runSeed = async () => {
  try {
    console.log("🌱 Iniciando proceso de seed...");

    // Conectar a la base de datos
    await connectDB();

    // Limpiar datos existentes
    console.log("🗑️  Limpiando datos existentes...");
    await UserModel.deleteMany({});
    await Service.deleteMany({});
    console.log("✅ Datos anteriores eliminados");

    // Insertar usuarios
    console.log("👥 Insertando usuarios...");
    const insertedUsers = await UserModel.insertMany(usersData);
    console.log(`✅ ${insertedUsers.length} usuarios insertados exitosamente`);

    // Mostrar información de los usuarios creados
    insertedUsers.forEach((user) => {
      console.log(
        `   - ${user.userName} (${user.userEmail}) - Rol: ${user.userRole}`
      );
    });

    // Insertar servicios
    console.log("\n✂️  Insertando servicios...");
    const insertedServices = await Service.insertMany(servicesData);
    console.log(
      `✅ ${insertedServices.length} servicios insertados exitosamente`
    );

    // Mostrar información de los servicios creados
    insertedServices.forEach((service) => {
      console.log(
        `   - ${service.name} - $${service.price} (${service.duration} min)`
      );
    });

    console.log("\n🎉 ¡Seed completado exitosamente!");
    console.log("\n📝 Credenciales de prueba:");
    console.log("======================================");
    console.log("👤 Admin:");
    console.log("   Email: admin@barbershop.com");
    console.log("   Password: admin123");
    console.log("\n👤 Usuario regular:");
    console.log("   Email: maria@example.com");
    console.log("   Password: maria123");
    console.log("======================================");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error ejecutando seed:", error.message);
    console.error(error);
    process.exit(1);
  }
};

// Ejecutar el seed
runSeed();

