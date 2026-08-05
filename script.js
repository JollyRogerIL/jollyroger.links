"use strict";

document.addEventListener("DOMContentLoaded", () => {
    setupHeroParallax();
});


/**
 * Создаёт лёгкое движение фона Хайфы при прокрутке.
 *
 * Передняя композиция с пиратом остаётся на месте,
 * а фон перемещается медленнее, создавая глубину.
 */
function setupHeroParallax() {
    const hero = document.getElementById("hero");

    if (!hero) {
        return;
    }

    const reducedMotionEnabled = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotionEnabled) {
        hero.style.setProperty("--parallax-y", "0px");
        return;
    }

    let animationFrameId = null;

    function updateParallax() {
        animationFrameId = null;

        const heroRect = hero.getBoundingClientRect();
        const heroHeight = hero.offsetHeight;

        /*
         * Анимация считается только пока hero находится
         * рядом с видимой частью страницы.
         */
        if (
            heroRect.bottom < 0 ||
            heroRect.top > window.innerHeight
        ) {
            return;
        }

        /*
         * Максимальное перемещение намеренно небольшое.
         * На смартфоне слишком сильный параллакс быстро
         * превращается в дёрганую карусель.
         */
        const maximumMovement = Math.min(
            45,
            heroHeight * 0.07
        );

        const scrollProgress = Math.max(
            0,
            Math.min(
                1,
                -heroRect.top / heroHeight
            )
        );

        const movement =
            scrollProgress * maximumMovement;

        hero.style.setProperty(
            "--parallax-y",
            `${movement.toFixed(2)}px`
        );
    }

    function requestParallaxUpdate() {
        if (animationFrameId !== null) {
            return;
        }

        animationFrameId =
            window.requestAnimationFrame(updateParallax);
    }

    updateParallax();

    window.addEventListener(
        "scroll",
        requestParallaxUpdate,
        {
            passive: true
        }
    );

    window.addEventListener(
        "resize",
        requestParallaxUpdate,
        {
            passive: true
        }
    );

    window.addEventListener(
        "orientationchange",
        requestParallaxUpdate
    );
}
