// alert("This page is under a lot of maintenance!!!\nText you see here might be designed as placeholders.\
//  I'd suggest checking back at another time. Feel free to read ahead to get a quick look, however!\n-Brian");

// ============================================
// DOM Ready & Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initCanvasAnimation();
    initCTAButton();
});

// ============================================
// Dark Mode Toggle
// ============================================
function initDarkMode() {
    const toggleBtn = document.getElementById('theme-toggle');
    
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('nexus-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('nexus-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem('nexus-theme');
        }
    });
}

// ============================================
// Canvas Hero Animation
// ============================================
function initCanvasAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Resize handler
    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Particle system
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 60 + 240}, 80%, ${Math.random() * 20 + 70}%)`
        });
    }

    // Animation loop
    let time = 0;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        time += 0.01;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// CTA Button & Modal
// ============================================
function initCTAButton() {
    const ctaBtn = document.getElementById('cta-button');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    if (!ctaBtn || !modalOverlay) return;

    // Show modal on CTA click with animation
    ctaBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('hidden');
        
        // Trigger entrance animation
        modalOverlay.style.animation = 'fadeIn 0.3s ease';
        
        setTimeout(() => {
            modalOverlay.style.animation = '';
        }, 300);
    });

    // Close modal functions
    function closeModal() {
        modalOverlay.classList.add('hidden');
        modalOverlay.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            modalOverlay.style.animation = '';
        }, 300);
    }

    modalClose.addEventListener('click', closeModal);
    
    // Close on overlay click or Escape key
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('.nav-links a, .hero-content .btn-primary').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip if it's an external link or anchor starting with #
        if (!href || href.startsWith('#')) return;
        if (href.startsWith('/')) return;

        e.preventDefault();
        const targetId = href.split('#')[1];
        const target = document.getElementById(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const currentScroll = window.scrollY;
    
    // Add shadow on scroll down, remove on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = '';
    }

    lastScroll = currentScroll;
});

// ============================================
// Form Input Animations
// ============================================
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Focus effect already handled in CSS
    
    // Add shake animation for invalid inputs
    input.addEventListener('invalid', () => {
        input.classList.add('shake');
    });
});

// ============================================
// Additional Animations on Scroll
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animation for feature cards
            if (entry.target.classList.contains('feature-card')) {
                const delay = parseInt(entry.target.style.getPropertyValue('--animation-delay', '0'));
                entry.target.style.animationDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('animate-in'); // Initially visible
});

console.log('%cHello!', 'background: #6366f1; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
console.log("It's insane, the power of AI. This particular page was built with help from Qwen-3.5-9B hosted on my own machine.");
console.log("Help me get a better GPU! Your support is appreciated, however it can be given.");