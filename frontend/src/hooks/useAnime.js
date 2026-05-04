import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function usePageIntro(dependency) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return undefined;
    const animation = animate(ref.current, {
      opacity: { from: 0, to: 1 },
      y: { from: 18, to: 0 },
      duration: 520,
      ease: "outCubic",
    });
    return () => animation.pause();
  }, [dependency]);

  return ref;
}

export function useStaggeredList(dependency) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return undefined;
    const items = ref.current.querySelectorAll("[data-animate-item]");
    if (!items.length) return undefined;
    const animation = animate(items, {
      opacity: { from: 0, to: 1 },
      y: { from: 16, to: 0 },
      duration: 460,
      delay: stagger(55),
      ease: "outCubic",
    });
    return () => animation.pause();
  }, [dependency]);

  return ref;
}

export function useHeroMotion() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return undefined;
    const rings = ref.current.querySelectorAll("[data-market-ring]");
    const orbits = ref.current.querySelectorAll("[data-market-orbit]");
    const bars = ref.current.querySelectorAll("[data-market-bars] span");
    const card = ref.current.querySelector("[data-market-card]");
    const sweep = ref.current.querySelector("[data-market-sweep]");
    const glows = ref.current.querySelectorAll("[data-hero-glow]");

    const ringAnimation = animate(rings, {
      rotate: { from: 0, to: 360 },
      duration: (_, index) => 14000 + index * 5200,
      ease: "linear",
      loop: true,
    });

    const orbitAnimation = animate(orbits, {
      rotate: { from: 0, to: 360 },
      duration: (_, index) => 16000 + index * 7000,
      ease: "linear",
      loop: true,
      direction: "alternate",
    });

    const barAnimation = animate(bars, {
      scaleX: [
        { to: 0.38, duration: 820 },
        { to: 1, duration: 980 },
        { to: 0.62, duration: 760 },
      ],
      opacity: [
        { to: 0.34, duration: 820 },
        { to: 0.92, duration: 980 },
        { to: 0.58, duration: 760 },
      ],
      delay: stagger(42),
      ease: "inOutSine",
      loop: true,
    });

    const cardAnimation = animate(card, {
      y: [
        { to: -14, duration: 1800 },
        { to: 8, duration: 2100 },
        { to: 0, duration: 1500 },
      ],
      rotate: [
        { to: -1.6, duration: 1800 },
        { to: 1.2, duration: 2100 },
        { to: 0, duration: 1500 },
      ],
      ease: "inOutSine",
      loop: true,
    });

    const sweepAnimation = animate(sweep, {
      rotate: { from: 0, to: 360 },
      duration: 5200,
      ease: "linear",
      loop: true,
    });

    const glowAnimation = animate(glows, {
      scale: [
        { to: 1.16, duration: 2200 },
        { to: 0.92, duration: 2600 },
        { to: 1, duration: 1600 },
      ],
      opacity: [
        { to: 0.64, duration: 2200 },
        { to: 0.34, duration: 2600 },
        { to: 0.52, duration: 1600 },
      ],
      delay: stagger(360),
      ease: "inOutSine",
      loop: true,
    });

    return () => {
      ringAnimation.pause();
      orbitAnimation.pause();
      barAnimation.pause();
      cardAnimation.pause();
      sweepAnimation.pause();
      glowAnimation.pause();
    };
  }, []);

  return ref;
}
