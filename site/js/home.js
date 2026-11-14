// Home Page - 3D Tilt Card Animation
VanillaTilt.init(document.querySelector(".tilt-card"), {
  max: 25,
  speed: 400,
  scale: 1.05
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});

document.querySelectorAll('.stat-card').forEach(card => {
  observer.observe(card);
});
