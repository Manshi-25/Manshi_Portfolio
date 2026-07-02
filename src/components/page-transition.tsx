

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function PageTransition({ pathname, children }: { pathname: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  // Disable on touch devices — Framer Motion layout animations are
  // expensive on mobile and cause noticeable jank during navigation.
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  if (reduceMotion || isTouch) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}