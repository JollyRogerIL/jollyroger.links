"use strict";

document.addEventListener("DOMContentLoaded", () => {
    setupRevealAnimation();
});


/**
 * Показывает элементы при прокрутке страницы.
 */
function setupRevealAnimation() {
    const elements = document.querySelectorAll(".reveal");

    if (elements.length === 0) {
        return;
    }

    const reducedMotionEnabled = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotionEnabled ||
        !("IntersectionObserver" in window)
    ) {
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
            threshold: 0.08,
            rootMargin: "0px 0px -25px 0px"
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}