let allSkills = [];
let allStacks = [];
let currentFilter = 'all';
let currentSearch = '';
let selectedSkill = null;
let selectedStack = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadStacks();
    await loadSkills();
    await loadReviews();
    renderStacks();
    renderSkills();
});

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

async function loadReviews() {
    try {
        const humanRes = await fetch('/api/v1/reviews/human');
        const agentRes = await fetch('/api/v1/reviews/agent');
        const humanReviews = await humanRes.json();
        const agentReviews = await agentRes.json();
        renderHumanReviews(humanReviews);
        renderAgentReviews(agentReviews);
    } catch (error) {
        renderHumanReviews(getDefaultHumanReviews());
        renderAgentReviews(getDefaultAgentReviews());
    }
}

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
        <div class="glass-card card-hover rounded-xl p-6 cursor-pointer" onclick="openStackModal('${stack.id}')">
            <div class="icon-container text-3xl mb-4">${stack.icon || '⚡'}</div>
            <h4 class="text-base font-bold mb-2">${stack.title}</h4>
            <p class="text-sm text-gray-400 mb-4 line-clamp-2">${stack.description}</p>
            <div class="flex flex-wrap gap-2">
                ${stack.jobs.map(job => `<span class="px-2 py-1 text-xs font-semibold rounded-full glow-badge text-white">${job}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

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

    const sponsored = getSponsoredSkills();
    const withSponsored = injectSponsoredTiles(filtered, sponsored);

    container.innerHTML = withSponsored.map((item, idx) => {
        if (item.type === 'sponsored') {
            return renderSponsoredSkillTile(item, idx);
        }
        return renderSkillTile(item);
    }).join('');
}

function renderSkillTile(skill) {
    const authorInitial = skill.author.charAt(0).toUpperCase();
    const isVerified = skill.security_grade === 'A';

    return `
        <div class="glass-card skill-card-hover data-dense-card rounded-xl p-5 cursor-pointer" onclick="openInstallModal('${skill.id}')">
            <div class="data-dense-header">
                <div class="data-dense-title-section">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-lg">${skill.icon || '⚙️'}</span>
                        ${isVerified ? '<div class="verified-icon">✓</div>' : ''}
                    </div>
                    <h5 class="text-sm font-bold leading-tight">${skill.title}</h5>
                </div>
                <span class="grade-${skill.security_grade.toLowerCase()} px-2.5 py-1 rounded-md font-bold text-xs whitespace-nowrap">
                    ${skill.security_grade}
                </span>
            </div>

            <p class="text-xs text-gray-400 mb-4 line-clamp-2">${skill.description}</p>

            <div class="data-dense-metrics">
                <div class="stats-row">
                    <div class="metric-badge">
                        <span>📊</span>
                        <span>${skill.test_score}% coverage</span>
                    </div>
                    <div class="metric-badge">
                        <span>📦</span>
                        <span>v${skill.version}</span>
                    </div>
                </div>

                <div class="data-dense-author">
                    <div class="author-avatar">${authorInitial}</div>
                    <div>
                        <div class="data-dense-author-name">${skill.author}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSponsoredSkillTile(sponsored, idx) {
    return `
        <div class="sponsored-card skill-card-hover data-dense-card rounded-xl p-5 cursor-pointer" onclick="openInstallModal('${sponsored.id}')">
            <span class="sponsored-badge">Sponsored</span>

            <div class="data-dense-header">
                <div class="data-dense-title-section">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-lg">${sponsored.icon || '⭐'}</span>
                    </div>
                    <h5 class="text-sm font-bold leading-tight text-indigo-300">${sponsored.title}</h5>
                </div>
            </div>

            <p class="text-xs text-gray-300 mb-4 line-clamp-2">${sponsored.description}</p>

            <div class="data-dense-metrics">
                <div class="stats-row">
                    <div class="metric-badge" style="background-color: rgba(129, 140, 248, 0.15); border-color: rgba(129, 140, 248, 0.4);">
                        <span>⚡</span>
                        <span>${sponsored.installs || '10K+'}+ installs</span>
                    </div>
                    <div class="metric-badge" style="background-color: rgba(129, 140, 248, 0.15); border-color: rgba(129, 140, 248, 0.4);">
                        <span>✓</span>
                        <span>${sponsored.successRate || '98'}% success</span>
                    </div>
                </div>

                <div class="data-dense-author">
                    <div class="author-avatar" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-color: rgba(245, 158, 11, 0.3);">
                        ${sponsored.authorInitial || '🎯'}
                    </div>
                    <div>
                        <div class="data-dense-author-name">${sponsored.author}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSponsoredSkills() {
    return [
        {
            id: 'sponsored-agent-stack',
            type: 'sponsored',
            title: 'Sponsored Agent Stack',
            description: 'Complete multi-agent orchestration framework with pre-built integrations.',
            icon: '🤖',
            author: 'Premium Partner',
            authorInitial: '📍',
            installs: '50K',
            successRate: 99
        },
        {
            id: 'promoted-skill-pro',
            type: 'sponsored',
            title: 'Promoted Skill Pro',
            description: 'Enterprise-grade skill suite with advanced analytics and monitoring.',
            icon: '💎',
            author: 'Enterprise Team',
            authorInitial: '⚡',
            installs: '25K',
            successRate: 99
        }
    ];
}

function injectSponsoredTiles(filtered, sponsored) {
    const result = [...filtered];
    if (result.length > 3) {
        result.splice(3, 0, sponsored[0]);
    }
    if (result.length > 8) {
        result.splice(8, 0, sponsored[1]);
    }
    return result;
}

function filterSkills(job) {
    currentFilter = job;
    currentSearch = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('stackSearchInput').value = '';

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');
    renderSkills();
}

function searchItems() {
    const skillSearch = document.getElementById('searchInput');
    const stackSearch = document.getElementById('stackSearchInput');
    currentSearch = (skillSearch?.value || stackSearch?.value || '').trim();
    renderSkills();
    renderStacks();
}

function renderHumanReviews(reviews) {
    const container = document.getElementById('human-reviews');
    container.innerHTML = reviews.map(review => `
        <div class="p-4 rounded-lg border border-zinc-800 bg-opacity-50 hover:bg-opacity-100 transition">
            <div class="flex items-center justify-between mb-2">
                <h6 class="text-sm font-semibold">${review.title}</h6>
                <div class="flex gap-1">
                    ${[...Array(5)].map((_, i) => `<span class="text-xs">${i < review.rating ? '⭐' : '☆'}</span>`).join('')}
                </div>
            </div>
            <p class="text-sm text-gray-400 mb-3">${review.content}</p>
            <p class="text-xs text-gray-600">— ${review.author}</p>
        </div>
    `).join('');
}

function renderAgentReviews(reviews) {
    const container = document.getElementById('agent-reviews');
    container.innerHTML = reviews.map(review => `
        <div class="p-4 rounded-lg border border-zinc-800 bg-opacity-50 hover:bg-opacity-100 transition">
            <div class="flex items-center justify-between mb-2">
                <h6 class="text-sm font-semibold">${review.title}</h6>
                <span class="text-lg">🤖</span>
            </div>
            <p class="text-sm text-gray-400 mb-3">${review.content}</p>
            <p class="text-xs text-gray-600">— ${review.agent}</p>
        </div>
    `).join('');
}

function getDefaultHumanReviews() {
    return [
        {
            title: "Precise File Editor",
            rating: 5,
            content: "Game-changing for my development workflow. Edits code exactly as specified.",
            author: "Sarah Chen"
        },
        {
            title: "Study Planner",
            rating: 5,
            content: "Finally understood complex topics. Spaced repetition approach actually works.",
            author: "Alex Kumar"
        },
        {
            title: "Hook Generator",
            rating: 4,
            content: "Great starting point. Sometimes needs tweaking but saves hours.",
            author: "Jordan Lee"
        },
        {
            title: "Security Auditor",
            rating: 5,
            content: "Caught vulnerabilities we missed. Worth its weight in gold.",
            author: "Morgan Davis"
        }
    ];
}

function getDefaultAgentReviews() {
    return [
        {
            title: "Precise File Editor",
            rating: 5,
            content: "Excellent pattern matching and contextual awareness. Minimal errors.",
            agent: "Claude Security Review"
        },
        {
            title: "TDD Enforcer",
            rating: 5,
            content: "Robust test generation. Covers edge cases effectively.",
            agent: "QA Bot"
        },
        {
            title: "Content Repurposer",
            rating: 4,
            content: "Handles format conversion well. Some nuances require human review.",
            agent: "Content Analysis AI"
        },
        {
            title: "Proposal Writer",
            rating: 5,
            content: "Professional formatting with strong persuasive elements.",
            agent: "Business Process AI"
        }
    ];
}

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
            <div class="flex items-center justify-between p-4 glass-card rounded-lg">
                <div>
                    <h6 class="font-semibold text-sm">${skill.title}</h6>
                    <p class="text-xs text-gray-400 mt-1">${skill.description}</p>
                </div>
                <span class="grade-${skill.security_grade.toLowerCase()} px-2 py-1 rounded-md font-bold text-xs whitespace-nowrap ml-4">
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
    alert(`📦 Download functionality would generate a ZIP file containing:\n\n✓ ${skillInfo.title}\n✓ Documentation\n✓ Configuration files\n\nIn production, this triggers server-side ZIP generation.`);
}

function downloadMarkdown() {
    const skillInfo = selectedSkill ? selectedSkill : selectedStack;
    const markdown = `# ${skillInfo.title}\n\n${skillInfo.description}\n\nID: ${skillInfo.id}`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skillInfo.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeStackModal();
    }
});
