// =====================================================
// Daily Dose Portfolio - JavaScript
// Author: May Thingyan
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // Cute Loading Animation
    // =====================================================
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // =====================================================
    // Mobile Navigation Toggle
    // =====================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
    
    // =====================================================
    // Navbar Scroll Effect
    // =====================================================
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // =====================================================
    // Active Navigation Link
    // =====================================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function setActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    
    // =====================================================
    // Smooth Scroll for Anchor Links
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // =====================================================
    // Intersection Observer for Animations
    // =====================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for cute effect
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation
    document.querySelectorAll('.stat-card, .skill-tag, .feature, .contact-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.9)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
        }
        
        .hero-title {
            animation: slideInLeft 0.8s ease forwards;
        }
        
        .hero-subtitle {
            animation: slideInLeft 0.8s ease 0.2s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        .hero-description {
            animation: slideInLeft 0.8s ease 0.4s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        .hero-buttons {
            animation: slideInUp 0.8s ease 0.6s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        .hero-card {
            animation: pop 0.8s ease 0.3s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pop {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // =====================================================
    // Typing Effect for Hero Title
    // =====================================================
    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        text.style.borderRight = '2px solid var(--primary)';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < originalText.length) {
                    text.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    text.style.borderRight = 'none';
                }
            }, 50);
        }, 1000 + (index * 500));
    });
    
    // =====================================================
    // Form Submission with cute feedback
    // =====================================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending... ✨';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent! 🎉';
                submitBtn.style.background = 'linear-gradient(135deg, #43A047, #66BB6A)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.transform = '';
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }
    
    // =====================================================
    // Parallax Effect on Hero Math Symbols (Desktop Only)
    // =====================================================
    const symbols = document.querySelectorAll('.math-symbols .symbol');
    
    if (!isMobile) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            symbols.forEach((symbol, index) => {
                const speed = (index + 1) * 0.3;
                const x = (mouseX - 0.5) * speed * 30;
                const y = (mouseY - 0.5) * speed * 30;
                const rotation = (mouseX - 0.5) * 15;
                symbol.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            });
        });
    }
    
    // =====================================================
    // Cute Cursor Trail Effect (Desktop Only)
    // =====================================================
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (!isMobile) {
        const cursorTrail = [];
        const trailLength = 6;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${10 - i}px;
                height: ${10 - i}px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${0.5 - i * 0.07};
                transition: transform 0.1s ease;
                display: none;
            `;
            document.body.appendChild(dot);
            cursorTrail.push({ el: dot, x: 0, y: 0 });
        }
        
        let mouseX = 0, mouseY = 0;
        let showTrail = false;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!showTrail) {
                showTrail = true;
                cursorTrail.forEach(dot => dot.el.style.display = 'block');
            }
        });
        
        function animateTrail() {
            let x = mouseX;
            let y = mouseY;
            
            cursorTrail.forEach((dot, index) => {
                const nextDot = cursorTrail[index + 1] || cursorTrail[0];
                
                dot.x = x;
                dot.y = y;
                dot.el.style.left = `${dot.x - 4}px`;
                dot.el.style.top = `${dot.y - 4}px`;
                
                x += (nextDot.x - x) * 0.35;
                y += (nextDot.y - y) * 0.35;
            });
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }
    
    // =====================================================
    // Add Confetti on Button Click
    // =====================================================
    const primaryBtns = document.querySelectorAll('.btn-primary');
    
    primaryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createConfetti(e.clientX, e.clientY);
        });
    });
    
    function createConfetti(x, y) {
        const colors = ['#2E7D32', '#4CAF50', '#FF8F00', '#FFB74D', '#A5D6A7'];
        const emojis = ['✨', '🎉', '💚', '🌟', '📐'];
        
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${Math.random() * 15 + 10}px;
                pointer-events: none;
                z-index: 10000;
                animation: confetti-fall ${Math.random() * 1 + 1}s ease-out forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 2000);
        }
    }
    
    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            0% {
                opacity: 1;
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg) scale(0);
            }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    console.log('🧮 May Thingyan Portfolio Loaded! Calculate smarter, learn faster! 📐✨');
});
