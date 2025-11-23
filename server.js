const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes

// Get all blog posts with optional pagination and category filter
app.get('/api/posts', async (req, res) => {
    try {
        const { limit = 50, offset = 0, category } = req.query;

        let query = 'SELECT * FROM blog_post_tecnologia';
        let params = [];

        if (category) {
            query += ' WHERE category = $1';
            params.push(category);
            query += ' ORDER BY date DESC LIMIT $2 OFFSET $3';
            params.push(limit, offset);
        } else {
            query += ' ORDER BY date DESC LIMIT $1 OFFSET $2';
            params.push(limit, offset);
        }

        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Get single blog post by slug
app.get('/api/posts/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const result = await db.query(
            'SELECT * FROM blog_post_tecnologia WHERE slug = $1',
            [slug]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json({ error: 'Error fetching post' });
    }
});

// Create new blog post
app.post('/api/posts', async (req, res) => {
    try {
        const { slug, title, category, excerpt, author, content, featured_image_url } = req.body;

        // Validation
        if (!slug || !title || !content) {
            return res.status(400).json({ error: 'Missing required fields: slug, title, content' });
        }

        const result = await db.query(
            `INSERT INTO blog_post_tecnologia 
       (slug, title, category, excerpt, author, content, featured_image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
            [slug, title, category, excerpt, author, content, featured_image_url]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') { // Unique constraint violation
            return res.status(409).json({ error: 'Post with this slug already exists' });
        }
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Error creating post' });
    }
});

// Get all unique categories
app.get('/api/categories', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT DISTINCT category FROM blog_post_tecnologia WHERE category IS NOT NULL ORDER BY category'
        );
        res.json(result.rows.map(row => row.category));
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Error fetching categories' });
    }
});

// Health check
app.get('/api/health', async (req, res) => {
    try {
        await db.query('SELECT NOW()');
        res.json({ status: 'ok', database: 'connected' });
        res.json({
            status: 'ok',
            database: 'connected',
            env_check: process.env.DATABASE_URL ? 'defined' : 'undefined'
        });
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            error: err.message,
            env_check: process.env.DATABASE_URL ? 'defined' : 'undefined'
        });
    }
});

// Catch-all route - must be AFTER all API routes
// This serves index.html for any route that doesn't match above
// Fixes "Cannot GET /" in production
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📰 Homepage: http://localhost:${PORT}`);
    console.log(`⚙️  Admin: http://localhost:${PORT}/admin.html`);
    console.log(`🔌 API: http://localhost:${PORT}/api/posts`);

    if (!process.env.DATABASE_URL) {
        console.error('❌ WARNING: DATABASE_URL environment variable is NOT set!');
    } else {
        console.log('✅ DATABASE_URL is set');
    }
});
