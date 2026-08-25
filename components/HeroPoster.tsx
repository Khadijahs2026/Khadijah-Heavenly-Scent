const WIDTHS = [640, 1024, 1536, 2048, 2732];

const srcSet = (ext: string) =>
  WIDTHS.map((w) => `/hero-${w}.${ext} ${w}w`).join(", ");

/**
 * The client's poster, used whole — it already carries the wordmark, the gold
 * arc and the meadow, so nothing here redraws them.
 *
 * The poster is landscape (roughly 16:9) and phones are not, so the frame steps
 * through aspect ratios instead of being cropped to the viewport: narrow
 * screens get a squarer frame and lose some sky at the edges, wide screens see
 * the whole thing. Every ratio in the ladder is wide enough that the wordmark —
 * which spans about 44% of the poster — never reaches the crop.
 */
export function HeroPoster() {
  return (
    <div className="relative aspect-[5/4] w-full sm:aspect-[3/2] lg:aspect-[16/9] lg:max-h-[72vh]">
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={srcSet("webp")} sizes="100vw" />
        <img
          src="/hero-1536.jpg"
          alt="A sunset over a meadow of blue wildflowers, beneath a deep blue and gold crest"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
        />
      </picture>

      {/* Carries the meadow down into the page colour so there is no seam
          between the photograph and the section beneath it. Sized in pixels,
          not percent: a percentage of a tall desktop frame swallows the band
          of wildflowers this fade is only meant to land on. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-navy-deep sm:h-16 lg:h-24"
      />
    </div>
  );
}
