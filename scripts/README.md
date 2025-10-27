# Scripts de Seed

Este directorio contiene scripts para poblar la base de datos con datos de prueba.

## seed.js

Script que crea datos de prueba para usuarios y servicios.

### Ejecución

```bash
npm run seed
```

### Datos que se crean

#### Usuarios (5 total)
- 2 administradores (admin, susana_peluquera)
- 3 usuarios regulares (maria_garcia, juan_pedro, ana_martinez)

**Credenciales de prueba:**
- **Admin**: admin@barbershop.com / admin123
- **Admin 2**: susana@peluqueria.com / facu123
- **Usuario**: maria@example.com / maria123

#### Servicios (5 total)
- Corte de Cabello - $15 (30 min)
- Afeitado Clásico - $20 (45 min)
- Corte + Barba - $25 (45 min)
- Lavado + Peinado - $12 (25 min)
- Tratamiento Capilar - $35 (60 min)

### Nota
El script elimina los datos existentes en las colecciones antes de insertar los nuevos.

