// Global state
let allSkills = [];
let allStacks = [];
let currentFilter = 'all';
let currentSearch = '';
let selectedSkill = null;
let selectedStack = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadStacks();
    await loadSkills();
    await loadReviews();
    renderStacks();
    renderSkills();
});

// Load stacks from API
async function loadStacks() {
    try {
        const response = await fetch('/api/v1/stacks');
        allStacks = await response.json();
    } catch (error) {
        console.error('Failed to load stacks:', error);
        // Fallback to hardcoded stacks
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

// Load skills from API
async function loadSkills() {
    try {
        const response = await fetch('/api/v1/skills');
        allSkills = await response.json();
    } catch (error) {
        console.error('Failed to load skills:', error);
        // Fallback to sample skills
        allSkills = [
            {
                id: "precise-file-editor",
                title: "Precise File Editor",
                description: "Edit files with surgical precision. Perfect for code refactoring.",
                author: "Claude Team",
                version: "2.1.0",
                security_grade: "A",
                test_score: 98,
                jobs: ["Developer"],
                target_apps: ["Claude"],
                icon: "✏️"
            },
            {
                id: "security-audit",
                title: "Security Auditor",
                description: "Comprehensive security analysis and vulnerability scanning.",
                author: "Security Team",
                version: "1.5.2",
                security_grade: "A",
                test_score: 95,
                jobs: ["Developer"],
                target_apps: ["Claude"],
                icon: "🔒"
            },
            {
                id: "tdd-enforcer",
                title: "TDD Enforcer",
                description: "Ensures test-driven development best practices.",
                author: "QA Team",
                version: "1.2.0",
                security_grade: "B",
                test_score: 92,
                jobs: ["Developer"],
                target_apps: ["Claude"],
                icon: "🧪"
            },
            {
                id: "study-planner",
                title: "Study Planner",
                description: "AI-powered spaced repetition and study scheduling.",
                author: "Education Team",
                version: "1.8.0",
                security_grade: "A",
                test_score: 96,
                jobs: ["Student"],
                target_apps: ["Claude"],
                icon: "📖"
            },
            {
                id: "doubt-solver",
                title: "Doubt Solver",
                description: "Get clarification on complex topics instantly.",
                author: "Tutor AI",
                version: "2.0.1",
                security_grade: "B",
                test_score: 91,
                jobs: ["Student"],
                target_apps: ["Claude"],
                icon: "❓"
            },
            {
                id: "script-writer",
                title: "Script Writer",
                description: "Generate compelling video and podcast scripts.",
                author: "Content Team",
                version: "1.9.0",
                security_grade: "B",
                test_score: 88,
                jobs: ["Creator"],
                target_apps: ["Claude"],
                icon: "📝"
            },
            {
                id: "hook-generator",
                title: "Hook Generator",
                description: "Create attention-grabbing opening lines for content.",
                author: "Marketing AI",
                version: "1.4.0",
                security_grade: "C",
                test_score: 85,
                jobs: ["Creator"],
                target_apps: ["Claude"],
                icon: "🎣"
            },
            {
                id: "proposal-writer",
                title: "Proposal Writer",
                description: "Draft winning client proposals and RFPs.",
                author: "Business Team",
                version: "2.1.1",
                security_grade: "A",
                test_score: 93,
                jobs: ["Founder"],
                target_apps: ["Claude"],
                icon: "📄"
            }
        ];
    }
}

// Load reviews from API
async function loadReviews() {
    try {
        const humanRes = await fetch('/api/v1/reviews/human');
        const agentRes = await fetch('/api/v1/reviews/agent');

        const humanReviews = await humanRes.json();
        const agentReviews = await agentRes.json();

        renderHumanReviews(humanReviews);
        renderAgentReviews(agentReviews);
    } catch (error) {
        console.error('Failed to load reviews:', error);
        renderHumanReviews(getDefaultHumanReviews());
        renderAgentReviews(getDefaultAgentReviews());
    }
}

// Render stacks
function renderStacks() {
    const container = document.getElementById('stacks-container');

    let filtered = allStacks;
    if (currentSearch) {
        const query = currentSearch.toLowerCase();
        filtered = allStacks.filter(stack =>
            stack.title.toLowerCase().includes(query) ||
            stack.description.toLowerCase().includes(query) ||
            stack.jobs.some(job => job.toLowerCase().includes(query))
        );
    }

    container.innerHTML = filtered.map(stack => `
        <div class="stack-card bg-white rounded-xl shadow-lg p-6 border border-gray-200 cursor-pointer" onclick="openStackModal('${stack.id}')">
            <div class="text-4xl mb-4">${stack.icon || '⚡'}</div>
            <h4 class="text-xl font-bold mb-2">${stack.title}</h4>
            <p class="text-gray-600 text-sm mb-4">${stack.description}</p>
            <div class="flex flex-wrap gap-2">
                ${stack.jobs.map(job => `<span class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">${job}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Render skills with filter
function renderSkills() {
    const container = document.getElementById('skills-container');

    let filtered = allSkills;
    if (currentFilter !== 'all') {
        filtered = allSkills.filter(skill => skill.jobs.includes(currentFilter));
    }

    if (currentSearch) {
        const query = currentSearch.toLowerCase();
        filtered = filtered.filter(skill =>
            skill.title.toLowerCase().includes(query) ||
            skill.description.toLowerCase().includes(query) ||
            skill.jobs.some(job => job.toLowerCase().includes(query)) ||
            skill.author.toLowerCase().includes(query)
        );
    }

    container.innerHTML = filtered.map(skill => `
        <div class="skill-badge bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition cursor-pointer" onclick="openInstallModal('${skill.id}')">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <div class="text-3xl mb-2">${skill.icon || '⚙️'}</div>
                    <h5 class="text-lg font-bold text-white">${skill.title}</h5>
                </div>
                <span class="grade-${skill.security_grade.toLowerCase()} px-3 py-1 rounded font-bold text-sm">
                    Grade ${skill.security_grade}
                </span>
            </div>
            <p class="text-gray-300 text-sm mb-4">${skill.description}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="text-yellow-400">⭐</span>
                    <span class="text-gray-300 text-sm">${skill.test_score}% tests</span>
                </div>
                <span class="text-gray-400 text-xs">${skill.version}</span>
            </div>
        </div>
    `).join('');
}

// Filter skills
function filterSkills(job) {
    currentFilter = job;
    currentSearch = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('stackSearchInput').value = '';
    // Update button states
    document.querySelectorAll('#skills .space-y-4 button, #skills .flex.gap-4 button').forEach((btn, idx) => {
        const jobs = ['all', 'Developer', 'Creator', 'Student', 'Founder'];
        if (jobs[idx] === job) {
            btn.className = 'px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700';
        } else {
            btn.className = 'px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600';
        }
    });
    renderSkills();
}

// Search items
function searchItems() {
    const skillSearch = document.getElementById('searchInput');
    const stackSearch = document.getElementById('stackSearchInput');
    currentSearch = (skillSearch?.value || stackSearch?.value || '').trim();
    renderSkills();
    renderStacks();
}

// Render human reviews
function renderHumanReviews(reviews) {
    const container = document.getElementById('human-reviews');
    container.innerHTML = reviews.map(review => `
        <div class="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-500">
            <div class="flex items-center justify-between mb-2">
                <h6 class="font-bold text-gray-900">${review.title}</h6>
                <div class="flex gap-1">
                    ${[...Array(5)].map((_, i) => `<span class="text-lg">${i < review.rating ? '⭐' : '☆'}</span>`).join('')}
                </div>
            </div>
            <p class="text-gray-700 text-sm">${review.content}</p>
            <p class="text-gray-500 text-xs mt-2">— ${review.author}</p>
        </div>
    `).join('');
}

// Render agent reviews
function renderAgentReviews(reviews) {
    const container = document.getElementById('agent-reviews');
    container.innerHTML = reviews.map(review => `
        <div class="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div class="flex items-center justify-between mb-2">
                <h6 class="font-bold text-gray-900">${review.title}</h6>
                <span class="text-2xl">🤖</span>
            </div>
            <p class="text-gray-700 text-sm">${review.content}</p>
            <p class="text-gray-500 text-xs mt-2">— ${review.agent}</p>
        </div>
    `).join('');
}

// Default reviews
function getDefaultHumanReviews() {
    return [
        {
            title: "Precise File Editor",
            rating: 5,
            content: "Absolutely game-changing for my development workflow. Edits code exactly as specified.",
            author: "Sarah Chen"
        },
        {
            title: "Study Planner",
            rating: 5,
            content: "Finally understood complex topics thanks to the spaced repetition approach. My grades improved!",
            author: "Alex Kumar"
        },
        {
            title: "Hook Generator",
            rating: 4,
            content: "Great starting point for content. Sometimes needs tweaking but saves hours.",
            author: "Jordan Lee"
        },
        {
            title: "Security Auditor",
            rating: 5,
            content: "Caught vulnerabilities we missed. Worth its weight in gold for compliance.",
            author: "Morgan Davis"
        }
    ];
}

function getDefaultAgentReviews() {
    return [
        {
            title: "Precise File Editor",
            rating: 5,
            content: "Demonstrates excellent pattern matching and contextual awareness. Minimal errors.",
            agent: "Claude Security Review"
        },
        {
            title: "TDD Enforcer",
            rating: 5,
            content: "Robust test generation. Covers edge cases effectively. Strong mutation testing results.",
            agent: "QA Bot"
        },
        {
            title: "Content Repurposer",
            rating: 4,
            content: "Handles format conversion well. Some semantic nuances require human review.",
            agent: "Content Analysis AI"
        },
        {
            title: "Proposal Writer",
            rating: 5,
            content: "Generates professionally formatted proposals with strong persuasive elements.",
            agent: "Business Process AI"
        }
    ];
}

// Modal functions
function openInstallModal(skillId) {
    selectedSkill = allSkills.find(s => s.id === skillId);
    if (selectedSkill) {
        document.getElementById('modalTitle').textContent = `Install: ${selectedSkill.title}`;
        document.getElementById('installModal').classList.remove('hidden');
    }
}

function closeModal() {
    document.getElementById('installModal').classList.add('hidden');
    document.getElementById('copyFeedback').classList.add('hidden');
}

function openStackModal(stackId) {
    selectedStack = allStacks.find(s => s.id === stackId);
    if (selectedStack) {
        document.getElementById('stackModalTitle').textContent = selectedStack.title;
        document.getElementById('stackModalDesc').textContent = selectedStack.description;

        const skillsList = document.getElementById('stackSkillsList');
        const stackSkills = allSkills.filter(skill => selectedStack.skills.includes(skill.id));

        skillsList.innerHTML = stackSkills.map(skill => `
            <div class="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div>
                    <h6 class="font-semibold text-gray-900">${skill.title}</h6>
                    <p class="text-sm text-gray-600">${skill.description}</p>
                </div>
                <span class="grade-${skill.security_grade.toLowerCase()} px-3 py-1 rounded font-bold">
                    ${skill.security_grade}
                </span>
            </div>
        `).join('');

        document.getElementById('stackModal').classList.remove('hidden');
    }
}

function closeStackModal() {
    document.getElementById('stackModal').classList.add('hidden');
}

function installStack() {
    if (selectedStack) {
        document.getElementById('stackModal').classList.add('hidden');
        document.getElementById('installModal').classList.remove('hidden');
        document.getElementById('modalTitle').textContent = `Install: ${selectedStack.title}`;
    }
}

// Install options
async function copyToClipboard() {
    const skillInfo = selectedSkill ? selectedSkill : selectedStack;
    const text = `Skill/Stack: ${skillInfo.title}\n\nID: ${skillInfo.id}\n\nDescription:\n${skillInfo.description}`;

    try {
        await navigator.clipboard.writeText(text);
        showCopyFeedback();
    } catch (err) {
        console.error('Failed to copy:', err);
    }
}

function showCopyFeedback() {
    const feedback = document.getElementById('copyFeedback');
    feedback.classList.remove('hidden');
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 3000);
}

function downloadZip() {
    const skillInfo = selectedSkill ? selectedSkill : selectedStack;
    alert(`📦 Download functionality would generate a ZIP file containing:\n\n✓ ${skillInfo.title}\n✓ Documentation\n✓ Configuration files\n\nIn a production environment, this would trigger a server-side ZIP generation.`);
}

function writeToFile() {
    const skillInfo = selectedSkill ? selectedSkill : selectedStack;
    alert(`💾 Browser write functionality:\n\n✓ Would create a new file: ${skillInfo.id}.json\n✓ With full skill configuration\n✓ Ready to import\n\nNote: This requires File System Access API permissions.`);
}

// Close modals on outside click
document.addEventListener('click', (e) => {
    const installModal = document.getElementById('installModal');
    const stackModal = document.getElementById('stackModal');

    if (e.target === installModal) {
        closeModal();
    }
    if (e.target === stackModal) {
        closeStackModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeStackModal();
    }
});
