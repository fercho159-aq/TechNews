# TechNews - Configuración de Producción

## 🔴 Problema: No cargan los datos en producción

El archivo `.env` con las credenciales de la base de datos **NO se sube a GitHub** por seguridad (está en `.gitignore`).

## ✅ Solución: Configurar Variables de Entorno en Producción

### Opción 1: Vercel (Recomendado)

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega estas variables:

```
DATABASE_URL = postgresql://neondb_owner:npg_hWR7yQga0wub@ep-empty-pine-a4xpry1f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PORT = 3000
```

4. Redeploy el proyecto

### Opción 2: Render

1. Ve a tu proyecto en Render
2. Environment → Environment Variables
3. Agrega:
   - Key: `DATABASE_URL`
   - Value: `postgresql://neondb_owner:npg_hWR7yQga0wub@ep-empty-pine-a4xpry1f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

### Opción 3: Railway

1. Settings → Variables
2. Add Variable:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_hWR7yQga0wub@ep-empty-pine-a4xpry1f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```

### Opción 4: Heroku

```bash
heroku config:set DATABASE_URL="postgresql://neondb_owner:npg_hWR7yQga0wub@ep-empty-pine-a4xpry1f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

## 📋 Variables Requeridas

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DATABASE_URL` | Tu URL de Neon PostgreSQL | Conexión a la base de datos |
| `PORT` | 3000 (opcional) | Puerto del servidor |

## 🔍 Verificar Conexión

Después de configurar, visita:
```
https://tu-app.vercel.app/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "database": "connected"
}
```

## ⚠️ Importante

- **NUNCA** subas el archivo `.env` a GitHub
- El archivo `.env.example` está incluido como referencia
- Cada plataforma de hosting tiene su propia forma de configurar variables de entorno

## 🛠️ Para desarrollo local

Crea un archivo `.env` (no se subirá a Git):
```bash
cp .env.example .env
```

Luego edita `.env` con tus credenciales locales.
