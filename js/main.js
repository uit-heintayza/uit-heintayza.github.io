// =====================================================
// Daily Dose Portfolio - JavaScript
// Author: May Thingyan
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    
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
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation
    document.querySelectorAll('.stat-card, .skill-tag, .feature, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // =====================================================
    // Form Submission (if using Formspree or similar)
    // =====================================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form will be handled by Formspree or similar service
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Reset after a delay (for demo purposes)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // =====================================================
    // Screenshot Gallery Scroll
    // =====================================================
    const screenshots = document.querySelector('.app-screenshots');
    
    if (screenshots) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        screenshots.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - screenshots.offsetLeft;
            scrollLeft = screenshots.scrollLeft;
        });
        
        screenshots.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        screenshots.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        screenshots.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - screenshots.offsetLeft;
            const walk = (x - startX) * 2;
            screenshots.scrollLeft = scrollLeft - walk;
        });
    }
    
    // =====================================================
    // Parallax Effect on Hero Math Symbols
    // =====================================================
    const symbols = document.querySelectorAll('.math-symbols .symbol');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        symbols.forEach((symbol, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 30;
            const y = (mouseY - 0.5) * speed * 30;
            symbol.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    console.log('🧮 May Thingyan Portfolio Loaded! Calculate smarter, learn faster! 📐');
});
