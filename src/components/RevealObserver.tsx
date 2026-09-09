"use client";

import { useEffect } from "react";

/** How far into the viewport an element must reach before it is revealed. */
const REVEAL_MARGIN = 0.12;

/**
 * Reveals every `[data-reveal]` element once it reaches the viewport.
 *
 * The hidden starting state lives behind `html[data-reveal-ready]`, which is
 * only set here — so with JavaScript off, or when the visitor prefers reduced
 * motion, everything renders visible as normal.
 *
 * The check runs against live geometry on a rAF-throttled scroll listener
 * rather than an IntersectionObserver. An observer can miss elements that a
 * fast flick or a smooth anchor jump skims past, which would leave a whole
 * section permanently invisible. Measuring position directly cannot.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    let targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const revealAll = () => {
      targets.forEach((el) => el.setAttribute("data-revealed", "true"));
      targets = [];
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      revealAll();
      return;
    }

    root.setAttribute("data-reveal-ready", "");

    let frame = 0;

    const check = () => {
      frame = 0;
      const limit = window.innerHeight * (1 - REVEAL_MARGIN);
      const remaining: HTMLElement[] = [];

      for (const el of targets) {
        // Reveal anything that has reached the trigger line, including
        // elements already scrolled past (a negative top).
        if (el.getBoundingClientRect().top < limit) {
          el.setAttribute("data-revealed", "true");
        } else {
          remaining.push(el);
        }
      }

      targets = remaining;
      if (!targets.length) detach();
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", onMotionChange);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    function onMotionChange(e: MediaQueryListEvent) {
      if (e.matches) {
        revealAll();
        detach();
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motionQuery.addEventListener("change", onMotionChange);
    check();

    return () => {
      detach();
      root.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
