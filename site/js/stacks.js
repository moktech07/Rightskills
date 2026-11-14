// Stacks Page - Pre-built Stack Combinations

const stacksData = [
  {
    id: 1,
    title: "Data Pipeline Master",
    icon: "🔄",
    description: "Complete ETL workflow automation with validation and error handling",
    skills: ["Data Pipeline Orchestrator", "Data Validator Pro", "Report Generator"],
    users: 324,
    rating: 4.9,
    category: "data"
  },
  {
    id: 2,
    title: "Content Creation Suite",
    icon: "✍️",
    description: "End-to-end content generation, optimization, and publishing workflow",
    skills: ["Content Generator Pro", "Content Optimizer", "Report Generator"],
    users: 512,
    rating: 4.8,
    category: "content"
  },
  {
    id: 3,
    title: "DevOps Excellence",
    icon: "🚀",
    description: "Secure deployment with continuous monitoring and automated rollbacks",
    skills: ["Security Auditor", "API Gateway Manager", "Workflow Automation Engine"],
    users: 287,
    rating: 4.9,
    category: "automation"
  },
  {
    id: 4,
    title: "Code Quality Guardian",
    icon: "🛡️",
    description: "Comprehensive code analysis with security and performance checks",
    skills: ["Code Review Assistant", "Security Auditor", "ML Model Trainer"],
    users: 198,
    rating: 4.7,
    category: "coding"
  },
  {
    id: 5,
    title: "Analytics & Insights",
    icon: "📊",
    description: "Transform raw data into actionable insights with intelligent dashboards",
    skills: ["Analytics Dashboard Builder", "ML Model Trainer", "Data Validator Pro"],
    users: 421,
    rating: 4.8,
    category: "analytics"
  },
  {
    id: 6,
    title: "Workflow Automation Pro",
    icon: "⚙️",
    description: "Intelligent automation for business processes and task management",
    skills: ["Workflow Automation Engine", "API Gateway Manager", "Report Generator"],
    users: 356,
    rating: 4.9,
    category: "automation"
  }
];

// Render stack card
function renderStackCard(stack) {
  return `
    <div class="stack-card">
      <div class="stack-icon">${stack.icon}</div>
      <h3 class="stack-title">${stack.title}</h3>
      <p class="stack-description">${stack.description}</p>

      <div class="stack-skills">
        ${stack.skills.map(skill => `<div class="stack-skill-item">${skill}</div>`).join('')}
      </div>

      <div class="stack-meta">
        <div class="stack-users">👥 ${stack.users} using</div>
        <div class="stack-rating">★ ${stack.rating}</div>
      </div>

      <div class="stack-actions">
        <a href="#" class="btn btn-secondary">Learn More</a>
        <a href="#" class="btn btn-primary">Deploy Stack</a>
      </div>
    </div>
  `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('stacksGrid');
  grid.innerHTML = stacksData.map(stack => renderStackCard(stack)).join('');
});
