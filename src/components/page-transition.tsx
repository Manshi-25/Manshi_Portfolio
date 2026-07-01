import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Smooth, lightweight route-change transition. Keyed by pathname so
 * AnimatePresence cross-fades the outgoing page out and the incoming
 * page in. Only opacity + a small transform are animated (cheap on
 * mobile GPUs), and it fully no-ops for prefers-reduced-motion users.
 */
export function PageTransition({ pathname, children }: { pathname: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="sync" initial={false}>
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
