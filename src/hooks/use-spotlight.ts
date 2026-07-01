import type { MouseEvent } from "react";

/**
 * Returns an onMouseMove handler that writes the pointer position into
 * --spot-x/--spot-y CSS custom properties on the target element, driving
 * the `.spotlight` utility's radial-gradient highlight. Pure CSS paint,
 * no re-renders — cheap enough to run on every pointer move.
 */
export function useSpotlight() {
  return (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--spot-x", `${x}%`);
    e.currentTarget.style.setProperty("--spot-y", `${y}%`);
  };
}
