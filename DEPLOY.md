# Guía de Deploy en Vercel

## Requisitos Previos
- ✅ Cuenta en Vercel (vercel.com)
- ✅ MongoDB Atlas configurado
- ✅ Repositorio en GitHub

## Pasos para Deploy

### 1. Conectar Proyecto a Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en "Add New Project"
4. Importa tu repositorio: `barber-shop-admin-backend`

### 2. Configurar Variables de Entorno
En la página de configuración del proyecto, ve a **Settings → Environment Variables** y agrega:

```
MONGO_URI = "mongodb+srv://usuario:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
JWT_SECRET = "tu-secreto-super-seguro-aqui"
NODE_ENV = "production"
```

⚠️ **IMPORTANTE**: Reemplaza los valores con tus datos reales:
- `MONGO_URI`: Tu cadena de conexión de MongoDB Atlas
- `JWT_SECRET`: Una cadena aleatoria segura (usa algo como: `openssl rand -base64 32`)

### 3. Configuración de Build
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: (dejar vacío)
- **Output Directory**: (dejar vacío)
- **Install Command**: `npm install`

### 4. Deploy
1. Click en **Deploy**
2. Vercel desplegará tu proyecto automáticamente
3. Una vez completado, tendrás una URL como: `tu-proyecto.vercel.app`

### 5. Probar el Deploy
Tu API estará disponible en:
- `https://tu-proyecto.vercel.app/api/citas`
- `https://tu-proyecto.vercel.app/api/usuarios`
- `https://tu-proyecto.vercel.app/api/estadisticas`
- `https://tu-proyecto.vercel.app/api/servicios`

## Troubleshooting

### Error: "MONGO_URI no está definida"
- Verifica que agregaste la variable de entorno en Vercel
- Asegúrate de hacer un redeploy después de agregar variables

### Error de conexión a MongoDB
- Verifica tu cadena de conexión
- Asegúrate de que tu IP está permitida en MongoDB Atlas (o usa 0.0.0.0/0)

### Funciones timeout
- Vercel tiene un timeout de 10s en plan gratuito
- Considera optimizar queries lentas

## Comandos Útiles

```bash
# Deployar desde terminal (requiere Vercel CLI)
vercel

# Ver logs en producción
vercel logs

# Redeploy después de cambios
git push origin main
```

