/* =====================================================
   ADVANCED PORTFOLIO - JAVASCRIPT
   All Interactive Features
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initCustomCursor();
    initThemeToggle();
    initNavbar();
    initMobileMenu();
    initTypingAnimation();
    initCounterAnimation();
    initParticles();
    initSkillTabs();
    initProjectFilter();
    initTimelineTabs();
    initSkillBars();
    initBackToTop();
    initSmoothScroll();
    initContactForm();
    initAOS();
    initTiltEffect();
});

/* =====================================================
   LOADING SCREEN
   ===================================================== */
function initLoader() {
    const loader = document.getElementById('loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 2500);
    });
}

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Smooth outline follow
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .tool-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

/* =====================================================
   THEME TOGGLE
   ===================================================== */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* =====================================================
   NAVBAR
   ===================================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* =====================================================
   MOBILE MENU
   ===================================================== */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = document.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });
}

/* =====================================================
   TYPING ANIMATION
   ===================================================== */
function initTypingAnimation() {
    const element = document.getElementById('typingText');
    if (!element) return;

    const texts = [
        'Web Developer',
        'UI/UX Designer',
        'Software Engineer',
        'Full Stack Developer',
        'Problem Solver'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Observe when counters come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* =====================================================
   PARTICLES
   ===================================================== */
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

/* =====================================================
   SKILL TABS
   ===================================================== */
function initSkillTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.skills-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/* =====================================================
   PROJECT FILTER
   ===================================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projects.forEach(project => {
                const category = project.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* =====================================================
   TIMELINE TABS
   ===================================================== */
function initTimelineTabs() {
    const tabs = document.querySelectorAll('.timeline-tab');
    const timelines = document.querySelectorAll('.timeline');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-timeline');

            tabs.forEach(t => t.classList.remove('active'));
            timelines.forEach(t => t.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/* =====================================================
   SKILL BARS ANIMATION
   ===================================================== */
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.level-bar');
                if (bar) {
                    const level = getComputedStyle(bar).getPropertyValue('--level');
                    bar.style.width = level;
                }
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));
}

/* =====================================================
   BACK TO TOP
   ===================================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Skip if href is just "#" or empty
            if (!targetId || targetId === '#' || targetId.length < 2) return;

            e.preventDefault();

            try {
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80;
                    const top = target.offsetTop - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            } catch (err) {
                // Invalid selector, ignore
            }
        });
    });
}

/* =====================================================
   CONTACT FORM
   ===================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Mohon isi semua field!', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }

        // Simulate sending
        const btn = form.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        btn.disabled = true;

        setTimeout(() => {
            showNotification('Pesan berhasil dikirim! Terima kasih.', 'success');
            form.reset();
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 2000);
    });
}

/* =====================================================
   NOTIFICATION
   ===================================================== */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    const bgColors = {
        success: 'linear-gradient(135deg, #22c55e, #16a34a)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        padding: 16px 24px;
        background: ${bgColors[type]};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        .notification button { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/* =====================================================
   AOS (Animate On Scroll) INIT
   ===================================================== */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
}

/* =====================================================
   TILT EFFECT
   ===================================================== */
function initTiltEffect() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.2
        });
    }
}
