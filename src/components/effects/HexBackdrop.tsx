/**
 * HexBackdrop — fixed, decorative SVG layer that paints a faint
 * hexagonal grid + radial vignette behind the page. Render once
 * at the root so all sections share a unified Hextech atmosphere.
 *
 * Purely presentational, no client JS.
 */
export function HexBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Hex grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex"
            width="56"
            height="48.5"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.2)"
          >
            <polygon
              points="28,0 56,16 56,40 28,56 0,40 0,16"
              fill="none"
              stroke="#c8aa6e"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(200,170,110,0.08), transparent 65%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(10,200,185,0.05), transparent 65%)",
        }}
      />
    </div>
  );
}
