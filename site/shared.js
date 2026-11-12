// Shared data and utilities
let allSkills = [];
let allStacks = [];
let currentFilter = 'all';
let currentSearch = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadSharedData();
    setupNavigation();
    initializePageSpecific();
});

async function loadSharedData() {
    await loadStacks();
    await loadSkills();
}

async function loadStacks() {
    try {
        const response = await fetch('/api/v1/stacks');
        allStacks = await response.json();
    } catch (error) {
        allStacks = [
            {
                id: "developer-essentials",
                title: "Developer Essentials",
                description: "Essential skills for coding agents: precise editing, security auditing, and test-driven development.",
                icon: "💻",
                jobs: ["Developer"],
                skills: ["precise-file-editor", "security-audit", "tdd-enforcer"]
            },
            {
                id: "exam-student",
                title: "Exam Prep & Study",
                description: "Master complex subjects with spaced repetition planners, doubt solvers, and past-paper analyzers.",
                icon: "📚",
                jobs: ["Student"],
                skills: ["study-planner", "doubt-solver", "summarizer"]
            },
            {
                id: "content-creator",
                title: "Content Creator Suite",
                description: "Write viral hooks, structure video scripts, and repurpose long-form articles.",
                icon: "🎬",
                jobs: ["Creator", "Marketer"],
                skills: ["script-writer", "hook-generator", "content-repurposer"]
            },
            {
                id: "founder-freelancer",
                title: "Founder & Freelancer",
                description: "Draft client proposals, legal summaries, and cold outreach emails.",
                icon: "🚀",
                jobs: ["Founder", "Freelancer"],
                skills: ["proposal-writer", "contract-summarizer", "outreach-copilot"]
            }
        ];
    }
}

async function loadSkills() {
    try {
        const response = await fetch('/api/v1/skills');
        allSkills = await response.json();
    } catch (error) {
        allSkills = [
            {
                id: "precise-file-editor",
                title: "Precise File Editor",
                description: "Edit files with surgical precision. Perfect for code refactoring.",
                author: "Claude Team",
                authorInitial: "C",
                version: "2.1.0",
                security_grade: "A",
                test_score: 98,
                usage_count: 12543,
                verified: true,
                jobs: ["Developer"],
                target_apps: ["Claude"],
                icon: "✏️"
            },
            {
                id: "security-audit",
                title: "Security Auditor",
                description: "Comprehensive security analysis and vulnerability scanning.",
                author: "Security Team",
                authorInitial: "S",
                version: "1.5.2",
                security_grade: "A",
                test_score: 95,
                usage_count: 9876,
                verified: true,
                jobs: ["Developer"],
                target_apps: ["Claude"],
                icon: "🔒"
            },
            {
                id: "tdd-enforcer",
                title: "TDD Enforcer",
                description: "Ensures test-driven development best practices.",
                author: "QA Team",
                authorInitial: "Q",
                version: "1.2.0",
                security_grade: "B",
                test_score: 92,
                usage_count: 7654,
                verified: true,
                jobs: ["Developer"],
                target_apps: ["Claude"],
                icon: "🧪"
            },
            {
                id: "study-planner",
                title: "Study Planner",
                description: "Create personalized study schedules with spaced repetition.",
                author: "Education Team",
                authorInitial: "E",
                version: "1.8.0",
                security_grade: "A",
                test_score: 94,
                usage_count: 5432,
                verified: true,
                jobs: ["Student"],
                target_apps: ["Claude"],
                icon: "📖"
            },
            {
                id: "doubt-solver",
                title: "Doubt Solver",
                description: "Interactive Q&A system that clarifies complex concepts.",
                author: "Learning Lab",
                authorInitial: "L",
                version: "2.0.1",
                security_grade: "A",
                test_score: 96,
                usage_count: 4321,
                verified: true,
                jobs: ["Student"],
                target_apps: ["Claude"],
                icon: "❓"
            },
            {
                id: "script-writer",
                title: "Script Writer",
                description: "Generate compelling video scripts with hooks and CTAs.",
                author: "Content Lab",
                authorInitial: "C",
                version: "1.6.3",
                security_grade: "B",
                test_score: 89,
                usage_count: 6543,
                verified: true,
                jobs: ["Creator"],
                target_apps: ["Claude"],
                icon: "🎥"
            },
            {
                id: "proposal-writer",
                title: "Proposal Writer",
                description: "Craft professional client proposals that close deals.",
                author: "Business Team",
                authorInitial: "B",
                version: "1.4.2",
                security_grade: "A",
                test_score: 93,
                usage_count: 8765,
                verified: true,
                jobs: ["Founder"],
                target_apps: ["Claude"],
                icon: "📝"
            },
            {
                id: "summarizer",
                title: "Text Summarizer",
                description: "Condense long documents into concise, actionable summaries.",
                author: "NLP Team",
                authorInitial: "N",
                version: "2.2.0",
                security_grade: "A",
                test_score: 97,
                usage_count: 11234,
                verified: true,
                jobs: ["Student", "Founder"],
                target_apps: ["Claude"],
                icon: "📄"
            }
        ];
    }
}

function setupNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a[href]');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (href === '/index.html' && currentPath === '/')) {
            link.classList.add('active');
        }
    });
}

// Page-specific initialization hook
function initializePageSpecific() {
    // Override in individual pages
}

// Search and filter utilities
function searchItems() {
    currentSearch = document.getElementById('searchInput')?.value || '';
    const stackSearch = document.getElementById('stackSearchInput')?.value || '';

    if (document.getElementById('skills-container')) {
        renderSkills();
    }
    if (document.getElementById('stacks-container')) {
        renderStacks();
    }
}

function filterSkills(job) {
    currentFilter = job;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderSkills();
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    const filtered = allSkills.filter(skill => {
        const matchesSearch = skill.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                             skill.description.toLowerCase().includes(currentSearch.toLowerCase());
        const matchesFilter = currentFilter === 'all' || skill.jobs.includes(currentFilter);
        return matchesSearch && matchesFilter;
    });

    container.innerHTML = filtered.map(skill => `
        <div class="glass-card card-hover">
            <div class="data-dense-header">
                <div class="data-dense-title-section">
                    <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
                        <span style="font-size: 1.5rem;">${skill.icon}</span>
                        <div>
                            <div style="font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                ${skill.title}
                                ${skill.verified ? '<span class="badge-verified">✓</span>' : ''}
                            </div>
                            <p style="font-size: 0.875rem; color: #a1a1aa; margin: 0.25rem 0 0 0;">${skill.author}</p>
                        </div>
                    </div>
                </div>
                <span class="grade-badge grade-${skill.security_grade.toLowerCase()}">${skill.security_grade}</span>
            </div>

            <p style="font-size: 0.875rem; color: #a1a1aa; margin: 0.75rem 0;">${skill.description}</p>

            <div class="data-dense-metrics">
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                    <span class="badge">📊 Test: ${skill.test_score}%</span>
                    <span class="badge">⭐ Used ${(skill.usage_count / 1000).toFixed(1)}k times</span>
                    <span class="badge">v${skill.version}</span>
                </div>
                <div class="data-dense-author" style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div class="avatar">${skill.authorInitial}</div>
                        <span class="data-dense-author-name">${skill.author}</span>
                    </div>
                    <button onclick="openSkillInstall('${skill.id}')" class="btn-secondary" style="font-size: 0.75rem; padding: 0.375rem 0.75rem;">
                        Install
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderStacks() {
    const container = document.getElementById('stacks-container');
    if (!container) return;

    const stackSearch = document.getElementById('stackSearchInput')?.value || '';

    const filtered = allStacks.filter(stack => {
        return stack.title.toLowerCase().includes(stackSearch.toLowerCase()) ||
               stack.description.toLowerCase().includes(stackSearch.toLowerCase());
    });

    container.innerHTML = filtered.map(stack => `
        <div class="glass-card card-hover" onclick="openStackDetail('${stack.id}')">
            <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">${stack.icon}</div>
            <h4 style="font-weight: 600; margin: 0 0 0.5rem 0;">${stack.title}</h4>
            <p style="font-size: 0.875rem; color: #a1a1aa; margin: 0; line-height: 1.4;">${stack.description}</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                ${stack.jobs.map(job => `<span class="badge">${job}</span>`).join('')}
            </div>
            <button onclick="event.stopPropagation(); openStackInstall('${stack.id}')" class="btn-secondary" style="width: 100%; margin-top: 1rem;">
                View & Install →
            </button>
        </div>
    `).join('');
}

// Modal utilities
function openSkillInstall(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;

    const modal = document.getElementById('installModal');
    document.getElementById('modalTitle').textContent = `Install: ${skill.title}`;
    modal.classList.remove('hidden');
    window.selectedSkill = skill;
}

function openStackInstall(stackId) {
    const stack = allStacks.find(s => s.id === stackId);
    if (!stack) return;

    const modal = document.getElementById('stackModal');
    document.getElementById('stackModalTitle').textContent = stack.title;
    document.getElementById('stackModalDesc').textContent = stack.description;

    const skillsList = document.getElementById('stackSkillsList');
    skillsList.innerHTML = stack.skills.map(skillId => {
        const skill = allSkills.find(s => s.id === skillId);
        return `
            <div style="padding: 0.75rem; background-color: rgba(129, 140, 248, 0.05); border: 1px solid var(--border-color); border-radius: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span>${skill?.icon || '⚙️'}</span>
                    <div>
                        <div style="font-weight: 500; font-size: 0.875rem;">${skill?.title || skillId}</div>
                        <div style="font-size: 0.75rem; color: #a1a1aa;">${skill?.description || ''}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    modal.classList.remove('hidden');
    window.selectedStack = stack;
}

function openStackDetail(stackId) {
    openStackInstall(stackId);
}

function closeModal() {
    document.getElementById('installModal')?.classList.add('hidden');
}

function closeStackModal() {
    document.getElementById('stackModal')?.classList.add('hidden');
}

function copyToClipboard() {
    const skill = window.selectedSkill;
    if (!skill) return;

    const text = `@claude
Skill: ${skill.title}
Description: ${skill.description}
Author: ${skill.author}
Security Grade: ${skill.security_grade}
Test Score: ${skill.test_score}%
Version: ${skill.version}`;

    navigator.clipboard.writeText(text).then(() => {
        const feedback = document.getElementById('copyFeedback');
        feedback?.classList.remove('hidden');
        setTimeout(() => feedback?.classList.add('hidden'), 2000);
    });
}

function downloadMarkdown() {
    const skill = window.selectedSkill;
    if (!skill) return;

    const markdown = `# ${skill.title}

**Author:** ${skill.author}
**Version:** ${skill.version}
**Security Grade:** ${skill.security_grade}
**Test Score:** ${skill.test_score}%

## Description
${skill.description}

## Details
- **ID:** ${skill.id}
- **Target Apps:** ${skill.target_apps.join(', ')}
- **For:** ${skill.jobs.join(', ')}

---
Installed from RightSkills on ${new Date().toLocaleDateString()}`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skill.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
}

function downloadZip() {
    // Placeholder for ZIP download functionality
    alert('ZIP download coming soon!');
}

function installStack() {
    const stack = window.selectedStack;
    if (!stack) return;

    const text = `@claude
Stack: ${stack.title}
Description: ${stack.description}

Skills:
${stack.skills.map(skillId => {
    const skill = allSkills.find(s => s.id === skillId);
    return `- ${skill?.title || skillId}`;
}).join('\n')}`;

    navigator.clipboard.writeText(text).then(() => {
        alert(`Stack "${stack.title}" copied to clipboard!`);
        closeStackModal();
    });
}

// Light Mode Functions
function openLightModeModal() {
    const modal = document.getElementById('lightModeModal');
    modal.classList.remove('hidden');
}

function closeLightModeModal() {
    const modal = document.getElementById('lightModeModal');
    modal.classList.add('hidden');
}

function switchToDarkMode() {
    closeLightModeModal();
    // Dark mode is already the default, just close the modal
}

function stayInLightMode() {
    closeLightModeModal();
    // Apply light mode theme to the document
    document.documentElement.style.setProperty('--bg-primary', '#ffffff');
    document.documentElement.style.setProperty('--bg-secondary', '#f5f5f5');
    document.documentElement.style.setProperty('--bg-tertiary', '#eeeeee');
    document.documentElement.style.setProperty('--border-color', '#e0e0e0');
    document.body.style.color = '#09090b';

    // Update the button text to indicate we're in light mode
    const lightModeBtn = document.querySelector('.light-mode-btn');
    if (lightModeBtn) {
        lightModeBtn.textContent = '🌙 Dark Mode';
        lightModeBtn.onclick = switchToDarkMode;
    }
}

// Close modal when clicking on the overlay
document.addEventListener('DOMContentLoaded', () => {
    const lightModeModal = document.getElementById('lightModeModal');
    if (lightModeModal) {
        lightModeModal.addEventListener('click', (e) => {
            if (e.target === lightModeModal) {
                closeLightModeModal();
            }
        });
    }
});
