import './style.css'
import { initAnimations } from './animation.js'

// ═══════════════════════════════════════════════════════
// 465 — Main Application Module
// ═══════════════════════════════════════════════════════

// Intersection Observer for scroll reveal animations
const observeReveals = () => {
    const reveals = document.querySelectorAll('.reveal')
    if (!reveals.length) return

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                observer.unobserve(entry.target)
            }
        })
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    })

    reveals.forEach(el => observer.observe(el))
}

// FAQ Accordion
const initFAQ = () => {
    const faqItems = document.querySelectorAll('[data-faq]')
    const setExpanded = (item, expanded) => {
        const answer = item.querySelector('.faq-a')
        item.classList.toggle('active', expanded)
        item.setAttribute('aria-expanded', String(expanded))
        if (answer) answer.setAttribute('aria-hidden', String(!expanded))
    }

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-q')
        const answer = item.querySelector('.faq-a')
        const answerId = answer?.id || `faq-answer-${index + 1}`
        const questionId = question?.id || `faq-question-${index + 1}`

        item.setAttribute('role', 'button')
        item.setAttribute('tabindex', '0')
        item.setAttribute('aria-expanded', 'false')
        if (question) {
            question.id = questionId
            item.setAttribute('aria-labelledby', questionId)
        }
        if (answer) {
            answer.id = answerId
            answer.setAttribute('aria-hidden', 'true')
            item.setAttribute('aria-controls', answerId)
        }

        const toggleItem = () => {
            faqItems.forEach(other => {
                if (other !== item) setExpanded(other, false)
            })
            setExpanded(item, !item.classList.contains('active'))
        }

        item.addEventListener('click', toggleItem)
        item.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return
            e.preventDefault()
            toggleItem()
        })
    })
}

// Smooth scroll for anchor links (enhancement over CSS scroll-behavior)
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href')
            if (href === '#') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return
            }

            const target = document.querySelector(href)
            if (target) {
                e.preventDefault()
                const navHeight = document.querySelector('.nav')?.offsetHeight || 72
                const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 20
                window.scrollTo({ top: y, behavior: 'smooth' })
            }
        })
    })
}

// Nav background on scroll
const initNavScroll = () => {
    const nav = document.querySelector('.nav')
    if (!nav) return

    let ticking = false
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    nav.style.background = 'rgba(0, 0, 0, 0.85)'
                } else {
                    nav.style.background = 'rgba(0, 0, 0, 0.6)'
                }
                ticking = false
            })
            ticking = true
        }
    }, { passive: true })
}

// Mobile Hamburger menu logic
const initMobileMenu = () => {
    const toggleBtn = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!toggleBtn || !mobileMenu) return;

    const setMenuOpen = (isOpen) => {
        toggleBtn.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('active', isOpen);
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
        toggleBtn.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    
    toggleBtn.addEventListener('click', () => {
        setMenuOpen(!mobileMenu.classList.contains('active'));
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setMenuOpen(false);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            setMenuOpen(false);
            toggleBtn.focus();
        }
    });

    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !mobileMenu.classList.contains('active')) return;

        const focusable = mobileMenu.querySelectorAll('a[href], button:not([disabled])');
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    setMenuOpen(false);
}

// Mark active menu link based on current page url path
const markActiveMenu = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Match home or directory indexes
        const isHome = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/') || currentPath.endsWith('/index.html');
        const isLinkHome = href === '/' || href === '/index.html' || href === 'index.html' || href === './';
        
        if (isHome && isLinkHome) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else if (!isLinkHome && (currentPath.endsWith(href) || currentPath.includes(href.replace(/^\//, '')))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

const initRegistrationForms = () => {
    const forms = document.querySelectorAll('[data-registration-form]')
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            if (!form.checkValidity()) {
                form.reportValidity()
                return
            }

            window.location.href = form.getAttribute('action') || 'thanks.html'
        })
    })
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    observeReveals()
    initFAQ()
    initSmoothScroll()
    initNavScroll()
    initMobileMenu()
    markActiveMenu()
    initRegistrationForms()
    initAnimations()
})
