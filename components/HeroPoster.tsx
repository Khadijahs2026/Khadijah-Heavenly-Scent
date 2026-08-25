const WIDTHS = [640, 1024, 1536, 2048, 2732];

const srcSet = (ext: string) =>
  WIDTHS.map((w) => `/hero-${w}.${ext} ${w}w`).join(", ");

/**
 * The client's poster, used whole — it already carries the wordmark, the gold
 * arc and the meadow, so nothing here redraws them. It is always full width and
 * always above the form.
 *
 * From `lg` the frame takes the poster's own ratio, so the image fills the
 * width edge to edge with nothing cropped at all. At that width it is taller
 * than most viewports, so the form sits below the fold and the page scrolls —
 * the unavoidable cost of showing the whole poster full-bleed.
 *
 * Below `lg` a phone-shaped frame would make the poster a thin strip, so the
 * frame is squarer and `cover` trims sky from the left and right instead. Both
 * ratios stay wide enough that the wordmark, which spans about 44% of the
 * poster's width, is never touched.
 */
export function HeroPoster() {
  return (
    <div className="relative aspect-[5/4] w-full shrink-0 sm:aspect-[3/2] lg:aspect-[5408/3072]">
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={srcSet("webp")} sizes="100vw" />
        <img
          src="/hero-1536.jpg"
          alt="A sunset over a meadow of blue wildflowers, beneath a deep blue and gold crest"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] lg:object-center"
        />
      </picture>

      {/* Carries the photograph down into the page colour so the lower edge
          doesn't read as a hard line above the form. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-navy-deep sm:h-16 lg:h-20"
      />
    </div>
  );
}
