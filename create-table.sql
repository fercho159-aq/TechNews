-- Create blog_post_tecnologia table for tech news website
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

-- Indexes are created automatically:
-- - blog_post_tecnologia_pkey (BTREE on id) via PRIMARY KEY constraint
-- - blog_post_tecnologia_slug_key (BTREE on slug) via UNIQUE constraint

-- Verify table creation
-- \d blog_post_tecnologia
