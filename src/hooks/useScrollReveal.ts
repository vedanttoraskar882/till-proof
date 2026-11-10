import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.96) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    observer.observe(node);

    // Ensure content never remains hidden if scrolling quickly or in headless capture
    const onScrollCheck = () => {
      const currentRect = node.getBoundingClientRect();
      if (currentRect.top <= window.innerHeight * 0.98) {
        setRevealed(true);
        observer.disconnect();
        window.removeEventListener("scroll", onScrollCheck);
      }
    };
    window.addEventListener("scroll", onScrollCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollCheck);
    };
  }, []);

  return { ref, revealed };
}
