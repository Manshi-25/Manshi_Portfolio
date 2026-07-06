

import { useState } from "react";

/**
 * Shows the real image if present at `src`, else a soft gradient
 * placeholder with a label so the layout never breaks while photos
 * haven't been added yet to /public.
 *
 * fit="cover"   → fills the box, crops overflow (good for photos where
 *                 losing a bit of edge doesn't matter).
 * fit="contain" → the box is still filled edge-to-edge (a soft blurred
 *                 copy of the image fills the background), but the real
 *                 image sits centered on top, fully visible, never
 *                 cropped — best for certificates/screenshots/diagrams
 *                 where every part of the image matters.
 */
export function PhotoOrFallback({
  src,
  alt,
  label,
  className = "",
  fit = "cover",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`size-full grid place-items-center bg-gradient-to-br from-clay/30 via-plum/25 to-mustard/30 ${className}`}
      >
        <span className="font-serif text-foreground/50 text-sm text-center px-3">
          {label ?? "Add image"}
        </span>
      </div>
    );
  }

  if (fit === "contain") {
    return (
      <div className={`relative size-full overflow-hidden ${className}`}>
        {/* blurred, scaled-up copy fills the box completely */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover scale-110 blur-2xl opacity-70"
        />
        <div className="absolute inset-0 bg-background/35" />
        {/* the real image, shown completely, centered on top */}
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="absolute inset-0 size-full object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={`size-full object-cover ${className}`}
    />
  );
}