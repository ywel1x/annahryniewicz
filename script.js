/* =====================================================
   Dr Anna Hryniewicz — Redesign 2025
   JavaScript — Interaktywność i animacje
   ===================================================== */

class Website {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupScrollReveal();
        this.setupSmoothScroll();
        this.setupFormValidation();
        this.setupHeroVideo();
        this.setupTrainingVideo();
        this.setupHeaderScroll();
    }
    
    /* === Navigation === */
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    /* === Header Scroll Hide/Show === */
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScroll = 0;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll <= 0) {
                        header.classList.remove('hidden');
                    } else if (currentScroll > lastScroll && currentScroll > 100) {
                        // Scrolling down
                        header.classList.add('hidden');
                    } else {
                        // Scrolling up
                        header.classList.remove('hidden');
                    }
                    
                    lastScroll = currentScroll;
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    /* === Scroll Reveal Animation === */
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        if (!revealElements.length) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => observer.observe(el));
    }
    
    /* === Smooth Scrolling === */
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /* === Hero Video === */
    setupHeroVideo() {
        const heroVideo = document.getElementById('heroVideo');
        const playBtn = document.getElementById('heroPlayBtn');
        const unmuteBtn = document.getElementById('heroUnmuteBtn');
        
        if (!heroVideo || !playBtn) return;
        
        // Auto-play muted on load
        heroVideo.muted = true;
        heroVideo.play().then(() => {
            playBtn.classList.add('playing');
        }).catch(() => {
            // Autoplay was prevented
        });
        
        // Play button click
        playBtn.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play();
                playBtn.classList.add('playing');
            }
        });
        
        // Unmute button click - restart video with sound
        if (unmuteBtn) {
            unmuteBtn.addEventListener('click', () => {
                heroVideo.muted = false;
                heroVideo.currentTime = 0;
                heroVideo.play();
                unmuteBtn.classList.add('hidden');
            });
            
            const updateUnmuteIcon = () => {
                if (heroVideo.muted) {
                    unmuteBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>`;
                } else {
                    unmuteBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>`;
                }
            };
        }
        
        // Auto-replay when video ends
        heroVideo.addEventListener('ended', () => {
            heroVideo.currentTime = 0;
            heroVideo.play();
        });
        
        // Show play button when video is paused
        heroVideo.addEventListener('pause', () => {
            playBtn.classList.remove('playing');
        });
        
        heroVideo.addEventListener('play', () => {
            playBtn.classList.add('playing');
        });
        
        // Click on video to toggle play/pause
        heroVideo.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play();
            } else {
                heroVideo.pause();
            }
        });
    }
    
    /* === Training Video === */
    setupTrainingVideo() {
        // Training video uses native controls, no custom JS needed
        // User controls playback manually with sound enabled
    }
    
    /* === Form Validation === */
    setupFormValidation() {
        const form = document.querySelector('.contact-form');
        
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                this.submitForm(form);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(input) {
        const errorEl = input.parentElement.querySelector('.field-error');
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        input.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
        
        // Check required
        if (input.required && !input.value.trim()) {
            isValid = false;
            errorMessage = 'To pole jest wymagane';
        }
        
        // Check email format
        if (isValid && input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorMessage = 'Podaj poprawny adres email';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            input.classList.add('error');
            if (errorEl) errorEl.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    submitForm(form) {
        const button = form.querySelector('.submit-button');
        const originalText = button.textContent;
        
        // Show loading state
        button.disabled = true;
        button.textContent = 'Wysyłanie...';
        
        // Simulate form submission
        setTimeout(() => {
            // Show success state
            button.textContent = 'Wysłano ✓';
            button.style.background = 'var(--color-success)';
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
                button.style.background = '';
            }, 2500);
        }, 1200);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Website();
});
