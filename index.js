import "dotenv/config";
import { buildApp } from "./src/app.js";

const startServer = async () => {
  const app = await buildApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer().catch(console.error);
