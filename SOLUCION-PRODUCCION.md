# 🔧 Solución: Los datos no cargan en producción

## 🔴 Problema
Error 500 en `/api/posts` y `/api/categories`:
```
Failed to load resource: the server responded with a status of 500
```

## ✅ Soluciones (en orden)

### Paso 1: Verificar variables de entorno en Vercel

1. Ve a tu proyecto en **Vercel Dashboard**
2. **Settings** → **Environment Variables**
3. Asegúrate de que existe:
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_hWR7yQga0wub@ep-empty-pine-a4xpry1f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
4. Si no existe, agrégala
5. **Redeploy** el proyecto

### Paso 2: Crear la tabla en Neon (IMPORTANTE)

La tabla `blog_post_tecnologia` probablemente **NO existe** en tu base de datos de Neon.

#### Opción A - Desde Neon Console (Recomendado)
1. Ve a [Neon Console](https://console.neon.tech)
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Copia y pega el contenido del archivo `create-table.sql`:

```sql
CREATE TABLE blog_post_tecnologia (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    excerpt TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    author VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    featured_image_url TEXT
);
```

5. Click **Run** o presiona `Ctrl/Cmd + Enter`

#### Opción B - Desde tu terminal local
```bash
# Usa el script init-db.js
npm run init-db
```

### Paso 3: Agregar datos de ejemplo (Opcional)

Una vez creada la tabla, puedes agregar artículos de prueba desde Neon Console:

```sql
INSERT INTO blog_post_tecnologia (slug, title, category, author, excerpt, content, featured_image_url)
VALUES 
(
  'inteligencia-artificial-futuro',
  'Inteligencia Artificial: El Futuro del Desarrollo Web',
  'AI',
  'Fernando Tech',
  'Descubre cómo la IA está revolucionando el desarrollo web',
  'La inteligencia artificial está transformando radicalmente el panorama del desarrollo web. Herramientas como GPT-4 y Claude están permitiendo crear código más rápido...',
  'https://via.placeholder.com/1200x500/3b82f6/ffffff?text=AI'
);
```

### Paso 4: Verificar que funciona

Visita estos endpoints en tu sitio de producción:

1. **Health Check**: `https://tech-news-xcocdin-vercel.app/api/health`
   - Debe mostrar: `{"status":"ok","database":"connected"}`

2. **Posts**: `https://tech-news-xcocdin-vercel.app/api/posts`
   - Debe mostrar: `[]` (array vacío si no hay datos) o tus artículos

3. **Categories**: `https://tech-news-xcocdin-vercel.app/api/categories`
   - Debe mostrar: `[]` (array vacío si no hay categorías)

## 🔍 Diagnóstico rápido

### Si `/api/health` devuelve error:
❌ **Problema**: Variable de entorno `DATABASE_URL` no configurada
✅ **Solución**: Configurar en Vercel Settings → Environment Variables

### Si `/api/health` funciona pero `/api/posts` da error 500:
❌ **Problema**: La tabla `blog_post_tecnologia` no existe
✅ **Solución**: Crear la tabla con el SQL del Paso 2

### Si `/api/posts` devuelve `[]`:
✅ **Todo bien**: Solo necesitas agregar artículos

## 📝 Nuevo archivo creado: `init-db.js`

He creado un script que puedes ejecutar para:
- ✅ Verificar conexión a la base de datos
- ✅ Crear la tabla si no existe
- ✅ Mostrar cuántos artículos hay

Ejecuta:
```bash
npm run init-db
```

## ⚡ Resumen de comandos

```bash
# 1. Verificar/crear tabla localmente
npm run init-db

# 2. Subir cambios a GitHub
git add .
git commit -m "Add database initialization script"
git push

# 3. Vercel automáticamente redeploy (o hacerlo manual)
```

## 🎯 Checklist

- [ ] Variable `DATABASE_URL` configurada en Vercel
- [ ] Tabla `blog_post_tecnologia` creada en Neon
- [ ] `/api/health` retorna "connected"
- [ ] `/api/posts` retorna array (vacío o con datos)
- [ ] Al menos 1 artículo de prueba insertado

Una vez completado todo, tu sitio cargará los datos correctamente.
