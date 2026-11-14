// Catalog Page - Skills Data & Dynamic Rendering

const skillsData = [
  {
    id: 1,
    title: "Data Pipeline Orchestrator",
    description: "Automate ETL workflows with intelligent scheduling and error handling",
    author: "Alex Chen",
    authorInitial: "AC",
    verified: true,
    date: "2 months ago",
    category: "data",
    tags: ["ETL", "Automation"],
    rating: 4.9,
    ratingCount: 342,
    downloads: 1240,
    uses: 892,
    performance: "99.2%",
    status: "Active"
  },
  {
    id: 2,
    title: "Content Generator Pro",
    description: "AI-powered content creation with style customization and tone control",
    author: "Sarah Williams",
    authorInitial: "SW",
    verified: true,
    date: "3 weeks ago",
    category: "content",
    tags: ["AI", "Content"],
    rating: 4.8,
    ratingCount: 521,
    downloads: 1890,
    uses: 1456,
    performance: "98.9%",
    status: "Active",
    sponsored: true
  },
  {
    id: 3,
    title: "Code Review Assistant",
    description: "Intelligent code analysis with security checks and best practices",
    author: "Marcus Johnson",
    authorInitial: "MJ",
    verified: true,
    date: "1 month ago",
    category: "coding",
    tags: ["Code", "Security"],
    rating: 4.7,
    ratingCount: 289,
    downloads: 856,
    uses: 634,
    performance: "99.5%",
    status: "Active"
  },
  {
    id: 4,
    title: "Analytics Dashboard Builder",
    description: "Create interactive dashboards with real-time data visualization",
    author: "Emma Rodriguez",
    authorInitial: "ER",
    verified: true,
    date: "6 days ago",
    category: "analytics",
    tags: ["Analytics", "Visualization"],
    rating: 4.6,
    ratingCount: 198,
    downloads: 645,
    uses: 412,
    performance: "97.8%",
    status: "Active"
  },
  {
    id: 5,
    title: "Workflow Automation Engine",
    description: "Seamless automation for repetitive tasks with conditional logic",
    author: "David Park",
    authorInitial: "DP",
    verified: true,
    date: "2 weeks ago",
    category: "automation",
    tags: ["Automation", "Workflow"],
    rating: 4.9,
    ratingCount: 412,
    downloads: 1567,
    uses: 1123,
    performance: "99.1%",
    status: "Active",
    sponsored: true
  },
  {
    id: 6,
    title: "Data Validator Pro",
    description: "Comprehensive data validation with schema enforcement",
    author: "Lisa Zhang",
    authorInitial: "LZ",
    verified: true,
    date: "3 days ago",
    category: "data",
    tags: ["Data", "Validation"],
    rating: 4.8,
    ratingCount: 267,
    downloads: 734,
    uses: 523,
    performance: "99.3%",
    status: "Active"
  },
  {
    id: 7,
    title: "API Gateway Manager",
    description: "Centralized API management with rate limiting and monitoring",
    author: "James Wilson",
    authorInitial: "JW",
    verified: true,
    date: "1 week ago",
    category: "automation",
    tags: ["API", "Gateway"],
    rating: 4.7,
    ratingCount: 156,
    downloads: 521,
    uses: 378,
    performance: "99.4%",
    status: "Active"
  },
  {
    id: 8,
    title: "Content Optimizer",
    description: "SEO and readability enhancement for content marketing",
    author: "Nina Patel",
    authorInitial: "NP",
    verified: true,
    date: "10 days ago",
    category: "content",
    tags: ["SEO", "Content"],
    rating: 4.6,
    ratingCount: 334,
    downloads: 912,
    uses: 687,
    performance: "98.7%",
    status: "Active"
  },
  {
    id: 9,
    title: "Security Auditor",
    description: "Automated security scanning and vulnerability assessment",
    author: "Robert Chen",
    authorInitial: "RC",
    verified: true,
    date: "5 days ago",
    category: "coding",
    tags: ["Security", "Audit"],
    rating: 4.9,
    ratingCount: 289,
    downloads: 678,
    uses: 512,
    performance: "99.8%",
    status: "Active",
    sponsored: true
  },
  {
    id: 10,
    title: "ML Model Trainer",
    description: "End-to-end machine learning pipeline with model optimization",
    author: "Sophia Anderson",
    authorInitial: "SA",
    verified: true,
    date: "2 weeks ago",
    category: "analytics",
    tags: ["ML", "Data Science"],
    rating: 4.7,
    ratingCount: 223,
    downloads: 456,
    uses: 334,
    performance: "97.9%",
    status: "Active"
  },
  {
    id: 11,
    title: "Form Builder Pro",
    description: "Dynamic form generation with validation and submission handling",
    author: "Michael Lee",
    authorInitial: "ML",
    verified: true,
    date: "3 weeks ago",
    category: "coding",
    tags: ["Forms", "UI"],
    rating: 4.8,
    ratingCount: 401,
    downloads: 1123,
    uses: 834,
    performance: "99.0%",
    status: "Active"
  },
  {
    id: 12,
    title: "Report Generator",
    description: "Automated report creation with custom templates and scheduling",
    author: "Victoria Brown",
    authorInitial: "VB",
    verified: true,
    date: "4 days ago",
    category: "automation",
    tags: ["Reports", "Automation"],
    rating: 4.7,
    ratingCount: 178,
    downloads: 534,
    uses: 401,
    performance: "98.5%",
    status: "Active"
  }
];

const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let currentFilter = 'all';
let currentSearch = '';

// Render skill card
function renderSkillCard(skill) {
  const isSponsored = skill.sponsored;
  const cardClass = isSponsored ? 'skill-card sponsored' : 'skill-card';
  const sponsoredBadge = isSponsored ? '<div class="sponsored-badge">Sponsored</div>' : '';

  return `
    <div class="${cardClass}">
      ${sponsoredBadge}

      <div class="skill-header">
        <div class="author-info">
          <div class="author-avatar">${skill.authorInitial}</div>
          <div class="author-meta">
            <div class="author-name">
              ${skill.author}
              ${skill.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </div>
            <div class="author-date">${skill.date}</div>
          </div>
        </div>
      </div>

      <h3 class="skill-title">${skill.title}</h3>
      <p class="skill-description">${skill.description}</p>

      <div class="skill-tags">
        ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
      </div>

      <div class="skill-metrics">
        <div class="metric">
          <span class="metric-value">${skill.downloads}</span>
          <span class="metric-label">Downloads</span>
        </div>
        <div class="metric">
          <span class="metric-value">${skill.uses}</span>
          <span class="metric-label">Uses</span>
        </div>
        <div class="metric">
          <span class="metric-value">${skill.performance}</span>
          <span class="metric-label">Uptime</span>
        </div>
      </div>

      <div class="skill-stats">
        <div class="rating">
          <span class="stars">★ ${skill.rating}</span>
          <span class="rating-count">(${skill.ratingCount})</span>
        </div>
        <span class="status-badge">${skill.status}</span>
      </div>

      <div class="skill-actions">
        <a href="#" class="btn btn-secondary">View</a>
        <a href="#" class="btn btn-primary">Use Skill</a>
      </div>
    </div>
  `;
}

// Filter and search skills
function getFilteredSkills() {
  let filtered = skillsData;

  // Filter by category
  if (currentFilter !== 'all') {
    filtered = filtered.filter(skill => skill.category === currentFilter);
  }

  // Filter by search
  if (currentSearch) {
    const query = currentSearch.toLowerCase();
    filtered = filtered.filter(skill =>
      skill.title.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query) ||
      skill.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
}

// Render skills grid
function renderSkills() {
  const filtered = getFilteredSkills();
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedSkills = filtered.slice(startIdx, endIdx);

  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = paginatedSkills.map(skill => renderSkillCard(skill)).join('');

  if (paginatedSkills.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">No skills found. Try adjusting your filters or search.</div>';
  }
}

// Render pagination
function renderPagination() {
  const filtered = getFilteredSkills();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pagination = document.getElementById('pagination');

  let html = '';

  // Previous button
  html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">← Previous</button>`;

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += '<span style="color: var(--text-muted);">...</span>';
    }
  }

  // Next button
  html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next →</button>`;

  pagination.innerHTML = html;
}

// Navigation functions
function goToPage(page) {
  currentPage = page;
  renderSkills();
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterSkills(filter) {
  currentFilter = filter;
  currentPage = 1;

  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
  });

  renderSkills();
  renderPagination();
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    currentPage = 1;
    renderSkills();
    renderPagination();
  });
}

// Setup filter buttons
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterSkills(btn.getAttribute('data-filter'));
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderPagination();
  setupSearch();
  setupFilters();
});
