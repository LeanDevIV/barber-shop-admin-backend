import 'dotenv/config';
import serverless from 'serverless-http';
import { buildApp } from '../src/app.js';

// buildApp devuelve la instancia de express (se conecta a la DB la primera vez)
let handlerPromise = (async () => {
  const app = await buildApp();
  return serverless(app);
})();

export default async function handler(req, res) {
  const handler = await handlerPromise;
  return handler(req, res);
}
