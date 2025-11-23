const { pool } = require('./db');

async function initDatabase() {
    try {
        console.log('🔄 Verificando conexión a la base de datos...');

        // Test connection
        await pool.query('SELECT NOW()');
        console.log('✅ Conexión a la base de datos exitosa');

        // Check if table exists
        const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'blog_post_tecnologia'
      );
    `);

        if (tableCheck.rows[0].exists) {
            console.log('✅ La tabla blog_post_tecnologia ya existe');

            // Count records
            const count = await pool.query('SELECT COUNT(*) FROM blog_post_tecnologia');
            console.log(`📊 Total de artículos: ${count.rows[0].count}`);
        } else {
            console.log('⚠️  La tabla blog_post_tecnologia NO existe. Creándola...');

            // Create table
            await pool.query(`
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
      `);

            console.log('✅ Tabla blog_post_tecnologia creada exitosamente');
        }

        console.log('✅ Base de datos lista para usar');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error inicializando la base de datos:', error);
        console.error('Detalles:', error.message);
        process.exit(1);
    }
}

initDatabase();
