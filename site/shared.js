let allSkills = [];
let allStacks = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupNav();
});

async function loadData() {
    try {
        const resSkills = await fetch('/api/v1/skills');
        const dataSkills = await resSkills.json();
        allSkills = dataSkills.skills || [];

        const resStacks = await fetch('/api/v1/stacks');
        const dataStacks = await resStacks.json();
        allStacks = dataStacks.stacks || [];

        if (typeof renderPageData === 'function') {
            renderPageData();
        }
    } catch (e) {
        console.error('Failed to load data:', e);
    }
}

function setupNav() {
    const path = window.location.pathname;
    document.querySelectorAll('nav a').forEach(a => {
        if (a.getAttribute('href') === path.split('/').pop()) {
            a.classList.add('active');
        }
    });
}

function openLightModeModal() {
    document.getElementById('lightModeModal')?.classList.remove('hidden');
}

function closeLightModeModal() {
    document.getElementById('lightModeModal')?.classList.add('hidden');
}

function switchToDarkMode() {
    closeLightModeModal();
    document.body.classList.remove('light-mode');
    const btn = document.querySelector('.light-mode-btn');
    if (btn) btn.textContent = '☀️ Light Mode';
}

function stayInLightMode() {
    closeLightModeModal();
    document.body.classList.add('light-mode');
    const btn = document.querySelector('.light-mode-btn');
    if (btn) btn.textContent = '🌙 Dark Mode';
}

function openInstallModal(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;
    const modal = document.getElementById('installModal');
    document.getElementById('modalTitle').textContent = `Install: ${skill.title}`;
    document.getElementById('modalDesc').textContent = skill.description;
    window.activeSkill = skill;
    modal?.classList.remove('hidden');
}

function closeInstallModal() {
    document.getElementById('installModal')?.classList.add('hidden');
}

function copyForChat() {
    const skill = window.activeSkill;
    if (!skill) return;
    const snippet = `@claude\nInstall skill: ${skill.title}\nDescription: ${skill.description}\nHash: ${skill.source_hash}`;
    navigator.clipboard.writeText(snippet).then(() => alert('Copied for chat!'));
}
