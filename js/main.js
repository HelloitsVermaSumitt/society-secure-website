// ============================================
//  SOCIETY SECURE — MAIN JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- CUSTOM CURSOR ----
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        if (follower) { follower.style.left = followerX + 'px'; follower.style.top = followerY + 'px'; }
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effect on links/buttons
    document.querySelectorAll('a, button, .feature-card, .role-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
            if (follower) { follower.style.width = '60px'; follower.style.height = '60px'; }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
            if (follower) { follower.style.width = '36px'; follower.style.height = '36px'; }
        });
    });

    // ---- NAVBAR SCROLL ----
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }
        checkReveal();
    });

    // ---- SCROLL REVEAL ----
    function checkReveal() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }
    checkReveal();

    // ---- COUNTER ANIMATION ----
    function animateCounter(el, target, suffix = '') {
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = start.toLocaleString() + suffix;
        }, 16);
    }

    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function checkCounters() {
        if (countersStarted) return;
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                countersStarted = true;
                counters.forEach(c => {
                    const target = parseInt(c.dataset.target);
                    const suffix = c.dataset.suffix || '';
                    animateCounter(c, target, suffix);
                });
            }
        });
    }
    window.addEventListener('scroll', checkCounters);
    checkCounters();

    // ---- MOBILE MENU ----
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- CONTACT FORM ----
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = '✓ Message Sent!';
            btn.style.background = '#00c8b4';
            btn.style.color = '#0d3d4a';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.style.color = '';
                form.reset();
            }, 3000);
        });
    }

    // ---- ACTIVE NAV LINK ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ---- PARALLAX ON HERO SHAPES ----
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.shape').forEach((shape, i) => {
            const speed = (i + 1) * 0.15;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ---- TILT EFFECT ON CARDS ----
    document.querySelectorAll('.feature-card, .role-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;
            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });

    // ---- TYPING EFFECT ON HERO ----
    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
        const words = ['Society', 'Residents', 'Society'];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const word = words[wordIndex];
            typingEl.textContent = isDeleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
            if (!isDeleting && charIndex > word.length) { isDeleting = true; setTimeout(type, 1500); return; }
            if (isDeleting && charIndex < 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
            setTimeout(type, isDeleting ? 60 : 100);
        }
        type();
    }

    // ---- SMOOTH ANCHOR SCROLL ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});