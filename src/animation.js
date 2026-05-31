// ═══════════════════════════════════════════════════════
// 465 — Animation & Interaction System
// ═══════════════════════════════════════════════════════

export const initAnimations = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 1. Mouse Tracking Glow Effect on Cards
    const cards = document.querySelectorAll('.card');

    if (cards.length && finePointer && !reducedMotion) {
        let activeCard = null;
        let pointerX = 0;
        let pointerY = 0;
        let frame = 0;
        let cardRect = null;

        const updateGlow = () => {
            frame = 0;
            if (!activeCard || !cardRect) return;

            activeCard.style.setProperty('--mouse-x', `${pointerX - cardRect.left}px`);
            activeCard.style.setProperty('--mouse-y', `${pointerY - cardRect.top}px`);
        };

        cards.forEach(card => {
            card.addEventListener('pointerenter', () => {
                activeCard = card;
                cardRect = card.getBoundingClientRect();
            }, { passive: true });

            card.addEventListener('pointerleave', () => {
                activeCard = null;
                cardRect = null;
            }, { passive: true });

            card.addEventListener('pointermove', (e) => {
                pointerX = e.clientX;
                pointerY = e.clientY;
                if (!frame) frame = requestAnimationFrame(updateGlow);
            }, { passive: true });
        });
    }

    // 2. Page Transition: Entrance (Fade in + Unblur)
    if (!reducedMotion) {
        document.body.classList.add('page-transitioning');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.remove('page-transitioning');
                document.body.classList.add('page-entered');
            });
        });
    } else {
        document.body.classList.add('page-entered');
    }

    // 3. Page Transition: Exit (Fade out + Blur)
    if (!reducedMotion) {
        const internalLinks = document.querySelectorAll('a[href]');

        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

                const href = link.getAttribute('href');
                if (!href || href.startsWith('#')) return;

                const target = link.target === '_blank';
                const isSkippedProtocol = /^(mailto:|tel:|javascript:)/i.test(href);
                const url = new URL(href, window.location.href);
                const isExternal = url.origin !== window.location.origin;
                const isSamePageAnchor = url.pathname === window.location.pathname && url.search === window.location.search && !!url.hash;

                if (isSamePageAnchor || target || isExternal || isSkippedProtocol || link.hasAttribute('download')) return;

                e.preventDefault();

                document.body.classList.remove('page-entered');
                document.body.classList.add('page-exiting');

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            });
        });
    }

    // 4. Hero Ambient Glow Animation
    const heroBg = document.querySelector('.hero');
    if (heroBg && !reducedMotion) {
        let t = 0;
        let heroVisible = true;

        const heroObserver = new IntersectionObserver((entries) => {
            heroVisible = entries.some(entry => entry.isIntersecting);
        }, { threshold: 0.05 });

        heroObserver.observe(heroBg);

        const animateHero = () => {
            if (heroVisible && !document.hidden) {
                t += 0.01;
                const scale = 1 + Math.sin(t) * 0.05;
                const opacity = 0.6 + Math.sin(t * 0.5) * 0.2;
                document.documentElement.style.setProperty('--hero-bg-scale', scale);
                document.documentElement.style.setProperty('--hero-bg-opacity', opacity);
            }

            requestAnimationFrame(animateHero);
        };

        requestAnimationFrame(animateHero);
    }
};
