import 'dotenv/config';
import serverless from 'serverless-http';
import { buildApp } from '../src/app.js';

let cachedApp;

export default async function handler(req, res) {
  // Optimización para serverless: cachear la app
  if (!cachedApp) {
    try {
      console.log('🚀 Iniciando función serverless...');
      const app = await buildApp();
      cachedApp = serverless(app);
      console.log('✅ App lista');
    } catch (error) {
      console.error('❌ Error al inicializar app:', error);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: error.message 
      });
    }
  }

  return cachedApp(req, res);
}
