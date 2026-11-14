// RightSkills - Shared JS
const LIGHT_MODE_KEY = 'rightskills-light-mode';

// Initialize light mode from localStorage
function initLightMode() {
  const isLightMode = localStorage.getItem(LIGHT_MODE_KEY) === 'true';
  if (isLightMode) {
    document.body.classList.add('light-mode');
  }
}

// Light mode toggle with easter egg
function setupLightModeToggle() {
  const btn = document.querySelector('.light-mode-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem(LIGHT_MODE_KEY, isLightMode);

    if (isLightMode) {
      showEasterEgg();
    }
  });
}

// Easter egg modal - "Are you really a developer??"
function showEasterEgg() {
  // Remove if already exists
  const existing = document.getElementById('easter-egg-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'easter-egg-modal';
  modal.innerHTML = `
    <div class="easter-egg-overlay">
      <div class="easter-egg-content">
        <div class="emoji-thinking">🤔</div>
        <h2>Are you really a developer??</h2>
        <p>Light mode? In 2026? That's suspicious...</p>
        <button class="btn btn-primary" onclick="this.closest('#easter-egg-modal').remove()">
          I can explain...
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Animate emoji
  setTimeout(() => {
    const emoji = modal.querySelector('.emoji-thinking');
    emoji.style.animation = 'doubtfulThinking 0.6s ease-in-out infinite';
  }, 100);

  // Close on overlay click
  modal.querySelector('.easter-egg-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      modal.remove();
    }
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (modal.parentElement) {
      modal.remove();
    }
  }, 5000);
}

// Add easter egg styles to document
function addEasterEggStyles() {
  if (document.getElementById('easter-egg-styles')) return;

  const style = document.createElement('style');
  style.id = 'easter-egg-styles';
  style.textContent = `
    #easter-egg-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      pointer-events: all;
    }

    .easter-egg-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      animation: fadeIn 0.3s ease;
    }

    .easter-egg-content {
      background: var(--bg-secondary);
      border: 2px solid var(--accent-blue);
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      max-width: 400px;
      box-shadow: 0 0 50px var(--accent-blue-dim);
      animation: slideUp 0.4s ease;
    }

    .emoji-thinking {
      font-size: 4rem;
      margin-bottom: 1rem;
      display: inline-block;
    }

    .easter-egg-content h2 {
      color: var(--accent-blue);
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }

    .easter-egg-content p {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes doubtfulThinking {
      0%, 100% {
        transform: rotate(0deg) scale(1);
      }
      25% {
        transform: rotate(-5deg) scale(1.05);
      }
      75% {
        transform: rotate(5deg) scale(1.05);
      }
    }

    @media (max-width: 768px) {
      .easter-egg-content {
        max-width: 90%;
        padding: 1.5rem;
      }

      .emoji-thinking {
        font-size: 3rem;
      }
    }
  `;

  document.head.appendChild(style);
}

// Setup navigation highlighting
function setupNavigation() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Match current page
    if (currentPath.endsWith(href) ||
        (href === '/' && currentPath.endsWith('index.html')) ||
        (href === '/' && currentPath === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initLightMode();
  addEasterEggStyles();
  setupLightModeToggle();
  setupNavigation();
});

// Smooth scroll anchor links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
