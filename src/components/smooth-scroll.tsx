import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Lenis v1.x does not have a `prevent` option — instead we stop
    // propagation manually: when the user clicks/touches a form element,
    // we call lenis.stop() so it doesn't process that event as a scroll
    // gesture, then lenis.start() again when they leave the field.
    const formTags = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"];

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (formTags.includes(t.tagName) || t.isContentEditable) {
        lenis.stop();
      }
    };

    const onFocusOut = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (formTags.includes(t.tagName) || t.isContentEditable) {
        lenis.start();
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      lenis.destroy();
    };
  }, []);

  return null;
}