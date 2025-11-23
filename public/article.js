// API Base URL
const API_URL = '/api';

// DOM Elements
const loading = document.getElementById('loading');
const articleContent = document.getElementById('articleContent');
const errorState = document.getElementById('errorState');

// Get slug from URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!slug) {
        showError();
        return;
    }
    loadArticle(slug);
});

// Fetch article by slug
async function loadArticle(slug) {
    try {
        loading.style.display = 'block';
        articleContent.style.display = 'none';
        errorState.style.display = 'none';

        const response = await fetch(`${API_URL}/posts/${slug}`);
        if (!response.ok) {
            if (response.status === 404) {
                showError();
                return;
            }
            throw new Error('Failed to fetch article');
        }

        const article = await response.json();

        loading.style.display = 'none';
        articleContent.style.display = 'block';

        displayArticle(article);

        // Update page title
        document.title = `${article.title} - TechNews`;
    } catch (error) {
        console.error('Error loading article:', error);
        showError();
    }
}

// Display article content
function displayArticle(article) {
    const date = new Date(article.date || article.created_at);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Only show image if URL exists
    const imageHtml = article.featured_image_url
        ? `<img src="${article.featured_image_url}" alt="${article.title}" class="article-featured-image" onerror="this.style.display='none'">`
        : '';

    articleContent.innerHTML = `
        <header class="article-header">
            ${article.category ? `<span class="article-category">${article.category}</span>` : ''}
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                ${article.author ? `<span>Por <strong>${article.author}</strong></span>` : ''}
                <span>${formattedDate}</span>
            </div>
        </header>
        
        ${imageHtml}
        
        <div class="article-content">
            ${formatContent(article.content)}
        </div>
        
        <div class="mt-2 text-center">
            <a href="/" class="btn">← Volver a noticias</a>
        </div>
    `;
}

// Format article content (convert line breaks to paragraphs)
function formatContent(content) {
    // Split by double line breaks to create paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    return paragraphs.map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`).join('');
}

// Show error state
function showError() {
    loading.style.display = 'none';
    articleContent.style.display = 'none';
    errorState.style.display = 'block';
}
