"use client";

import { useEffect } from "react";

/** Enhance visible server-rendered content without hiding it before hydration. */
export default function ScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    let intersections: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    function stop() {
      intersections?.disconnect();
      mutations?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
    function start() {
      stop();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      intersections = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          intersections?.unobserve(entry.target);
          const animation = entry.target.animate(
            [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => { animations.delete(animation); };
        });
      }, { threshold: 0.08 });
      function observe(root: ParentNode) {
        root.querySelectorAll("[data-scroll-reveal]").forEach(element => {
          if (!seen.has(element)) intersections?.observe(element);
        });
      }
      observe(document);
      // About card flips and review filters mount fresh content after hydration.
      mutations = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-scroll-reveal]") && !seen.has(node)) intersections?.observe(node);
          observe(node);
        }));
      });
      mutations.observe(document.body, { childList: true, subtree: true });
    }
    start();
    preference.addEventListener("change", start);
    return () => { stop(); preference.removeEventListener("change", start); };
  }, []);

  return null;
}
