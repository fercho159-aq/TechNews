// API Base URL
const API_URL = '/api';

// State
let allPosts = [];
let currentCategory = 'all';

// DOM Elements
const newsGrid = document.getElementById('newsGrid');
const filterBar = document.getElementById('filterBar');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('emptyState');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    loadCategories();
});

// Fetch all posts
async function loadPosts() {
    try {
        loading.style.display = 'block';
        newsGrid.style.display = 'none';
        emptyState.style.display = 'none';

        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) throw new Error('Failed to fetch posts');

        allPosts = await response.json();

        loading.style.display = 'none';

        if (allPosts.length === 0) {
            emptyState.style.display = 'block';
        } else {
            newsGrid.style.display = 'grid';
            displayPosts(allPosts);
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        loading.style.display = 'none';
        emptyState.style.display = 'block';
    }
}

// Fetch and display categories
async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');

        const categories = await response.json();

        // Add category buttons
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = category;
            btn.dataset.category = category;
            btn.addEventListener('click', () => filterByCategory(category));
            filterBar.appendChild(btn);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Filter posts by category
function filterByCategory(category) {
    currentCategory = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Filter and display posts
    if (category === 'all') {
        displayPosts(allPosts);
    } else {
        const filtered = allPosts.filter(post => post.category === category);
        displayPosts(filtered);
    }
}

// Display posts in grid
function displayPosts(posts) {
    newsGrid.innerHTML = '';

    posts.forEach((post, index) => {
        const card = createNewsCard(post, index);
        newsGrid.appendChild(card);
    });
}

// Create news card element
function createNewsCard(post, index) {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.onclick = () => window.location.href = `/article.html?slug=${post.slug}`;

    const date = new Date(post.date || post.created_at);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Only add image if URL exists
    const imageHtml = post.featured_image_url
        ? `<img src="${post.featured_image_url}" alt="${post.title}" class="news-card-image" loading="lazy" onerror="this.style.display='none'">`
        : '';

    card.innerHTML = `
        ${imageHtml}
        <div class="news-card-content">
            ${post.category ? `<span class="news-card-category">${post.category}</span>` : ''}
            <h3 class="news-card-title">${post.title}</h3>
            ${post.excerpt ? `<p class="news-card-excerpt">${post.excerpt}</p>` : ''}
            <div class="news-card-meta">
                ${post.author ? `<span class="news-card-author">Por ${post.author}</span>` : ''}
                <span class="news-card-date">${formattedDate}</span>
            </div>
        </div>
    `;

    return card;
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards when they're added
const observeCards = () => {
    document.querySelectorAll('.news-card').forEach(card => {
        observer.observe(card);
    });
};

// Call after posts are loaded
setTimeout(observeCards, 100);
