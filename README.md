# TechNews - Sitio Web de Noticias Tecnológicas

Un sitio web moderno de noticias sobre tecnología web, conectado a una base de datos Neon PostgreSQL.

## 🚀 Características

- ✨ Diseño moderno y premium con efectos glassmorphism
- 📱 Completamente responsive
- 🎨 Animaciones suaves y micro-interacciones
- 🗄️ Base de datos PostgreSQL (Neon)
- 🔌 API RESTful con Node.js/Express
- ⚡ Panel de administración para crear artículos
- 🏷️ Sistema de categorías y filtros

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- Acceso a la base de datos Neon PostgreSQL

## 🛠️ Instalación

1. **Clonar o navegar al directorio del proyecto**

```bash
cd /Users/fernandotrejo/.gemini/antigravity/playground/zonal-newton
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

El archivo `.env` ya está configurado con tu conexión a Neon:

```env
DATABASE_URL=postgresql://neondb_owner:...@ep-empty-pine-a4xpry1f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
PORT=3000
```

4. **Crear la tabla en la base de datos**

Ejecuta el script SQL para crear la tabla `blog_post_tecnologia`:

```bash
psql 'postgresql://neondb_owner:npg_hWR7yQga0wub@ep-empty-pine-a4xpry1f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' -f create-table.sql
```

O copia y pega el contenido de `create-table.sql` en tu consola de Neon.

5. **Iniciar el servidor**

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
.
├── server.js              # Servidor Express con API
├── db.js                  # Configuración de PostgreSQL
├── package.json           # Dependencias del proyecto
├── .env                   # Variables de entorno
├── create-table.sql       # Script SQL para crear la tabla
├── public/
│   ├── index.html        # Página principal
│   ├── app.js            # JavaScript de la página principal
│   ├── article.html      # Página de artículo individual
│   ├── article.js        # JavaScript de la página de artículo
│   ├── admin.html        # Panel de administración
│   ├── admin.js          # JavaScript del panel admin
│   └── styles.css        # Estilos CSS
└── README.md             # Este archivo
```

## 🔌 API Endpoints

### Obtener todos los posts
```
GET /api/posts
GET /api/posts?category=JavaScript
GET /api/posts?limit=10&offset=0
```

### Obtener un post por slug
```
GET /api/posts/:slug
```

### Crear un nuevo post
```
POST /api/posts
Content-Type: application/json

{
  "title": "Título del artículo",
  "slug": "titulo-del-articulo",
  "category": "JavaScript",
  "author": "Nombre del autor",
  "excerpt": "Breve descripción",
  "content": "Contenido completo del artículo",
  "featured_image_url": "https://ejemplo.com/imagen.jpg"
}
```

### Obtener categorías
```
GET /api/categories
```

### Health check
```
GET /api/health
```

## 💻 Uso

### Ver Artículos
1. Visita `http://localhost:3000`
2. Navega por los artículos
3. Filtra por categoría
4. Haz clic en un artículo para leerlo completo

### Crear Artículos
1. Visita `http://localhost:3000/admin.html`
2. Completa el formulario con:
   - Título (requerido)
   - Slug (se genera automáticamente)
   - Categoría
   - Autor
   - Extracto
   - URL de imagen destacada
   - Contenido (requerido)
3. Haz clic en "Publicar Artículo"

## 🗄️ Esquema de Base de Datos

Tabla: `blog_post_tecnologia`

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| slug | VARCHAR(255) | UNIQUE, NOT NULL |
| title | VARCHAR(255) | NOT NULL |
| category | VARCHAR(100) | - |
| excerpt | TEXT | - |
| date | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP |
| author | VARCHAR(255) | - |
| content | TEXT | NOT NULL |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP |
| featured_image_url | TEXT | - |

## 🎨 Características de Diseño

- **Color Palette**: Tonos oscuros con acentos vibrantes (púrpuras, azules, rosas neón)
- **Typography**: Inter para el cuerpo, Outfit para títulos
- **Effects**: 
  - Glassmorphism en tarjetas
  - Gradientes dinámicos
  - Animaciones de entrada (fade in, slide up)
  - Micro-animaciones en hover
  - Efectos de blur y sombras

## 🔧 Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Neon)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Fonts**: Google Fonts (Inter, Outfit)
- **Tools**: pg (node-postgres), dotenv, cors

## 📝 Notas

- La conexión a la base de datos usa SSL (requerido por Neon)
- Los artículos se ordenan por fecha descendente
- El slug debe ser único para cada artículo
- Las imágenes destacadas son opcionales (se usa placeholder si no se proporciona)

## 🚀 Deployment

Para producción:
1. Asegúrate de que `.env` no esté en el repositorio
2. Configura las variables de entorno en tu plataforma de hosting
3. Considera usar un proceso manager como PM2 para Node.js

## 📄 Licencia

ISC

---

¡Disfruta creando contenido tecnológico! 🎉
