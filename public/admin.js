// API Base URL
const API_URL = '/api';

// DOM Elements
const form = document.getElementById('articleForm');
const titleInput = document.getElementById('title');
const slugInput = document.getElementById('slug');
const alertContainer = document.getElementById('alertContainer');

// Auto-generate slug from title
titleInput.addEventListener('input', (e) => {
    const slug = generateSlug(e.target.value);
    slugInput.value = slug;
});

// Generate URL-friendly slug
function generateSlug(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove consecutive hyphens
}

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const article = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category') || null,
        author: formData.get('author') || null,
        excerpt: formData.get('excerpt') || null,
        content: formData.get('content'),
        featured_image_url: formData.get('featured_image_url') || null
    };

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error al crear el artículo');
        }

        showAlert('Artículo publicado exitosamente! Redirigiendo...', 'success');

        // Reset form and redirect after 2 seconds
        form.reset();
        setTimeout(() => {
            window.location.href = `/article.html?slug=${result.slug}`;
        }, 2000);

    } catch (error) {
        console.error('Error creating article:', error);
        showAlert(error.message || 'Error al publicar el artículo', 'error');
    }
});

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Reset form handler
form.addEventListener('reset', () => {
    alertContainer.innerHTML = '';
});
