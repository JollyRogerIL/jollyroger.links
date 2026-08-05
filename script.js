"use strict";

document.addEventListener("DOMContentLoaded", () => {
    setupRevealAnimation();
    disableEmptyLinks();
});


/**
 * Плавно показывает блоки при прокрутке.
 */
function setupRevealAnimation() {
    const elements = document.querySelectorAll(".reveal");

    if (elements.length === 0) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}


/**
 * Блокирует ссылки-заглушки,
 * пока реальные ссылки ещё не указаны.
 */
function disableEmptyLinks() {
    const emptyLinks = document.querySelectorAll('a[href="#"]');

    emptyLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });
}