/**
 * Visually hidden until focused — lets keyboard users jump straight to
 * the main content instead of tabbing through the entire header/sidebar.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-clay px-4 py-2 text-sm text-background opacity-0 transition-all focus:translate-y-0 focus:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
    >
      Skip to content
    </a>
  );
}
