/**
 * The gold sweep that divides the navy field from the sunset below — the
 * flyer's defining shape, drawn rather than photographed so it scales to any
 * viewport without an image request.
 *
 * The band is a filled shape between two parallel curves rather than a stroked
 * path: the SVG stretches non-uniformly to fill the viewport, which squashes a
 * stroke thin at the centre and leaves it thick at the edges.
 */

/** Left-to-right along the top of the gold; also the navy's lower edge. */
const EDGE_LTR = "C300,200 1140,200 1440,16";
/** The same curve travelled right-to-left, to close each shape. */
const EDGE_RTL = "C1140,200 300,200 0,16";

/** The gold band: down the top edge, across, back along the lower edge. */
const BAND = `M0,16 ${EDGE_LTR} L1440,58 C1140,242 300,242 0,58 Z`;

/** The navy field above, meeting the band exactly along its upper edge. */
const NAVY = `M0,0 H1440 V16 ${EDGE_RTL} Z`;

export function GoldArc() {
  return (
    <div className="relative -mt-px w-full" aria-hidden="true">
      <svg
        viewBox="0 0 1440 205"
        preserveAspectRatio="none"
        className="block h-[9vw] max-h-[112px] min-h-[52px] w-full"
      >
        <defs>
          <linearGradient id="arc-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8913f" />
            <stop offset="18%" stopColor="#e4cd94" />
            <stop offset="50%" stopColor="#fdf3d9" />
            <stop offset="82%" stopColor="#e4cd94" />
            <stop offset="100%" stopColor="#b8913f" />
          </linearGradient>
          <filter id="arc-glow" x="-10%" y="-80%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Halo, so the gold reads as lit rather than merely drawn. */}
        <path d={BAND} fill="url(#arc-gold)" opacity="0.5" filter="url(#arc-glow)" />
        <path d={BAND} fill="url(#arc-gold)" />
        <path d={NAVY} fill="var(--color-navy)" />
      </svg>
    </div>
  );
}
