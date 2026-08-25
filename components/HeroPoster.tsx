const WIDTHS = [640, 1024, 1536, 2048, 2732];

const srcSet = (ext: string) =>
  WIDTHS.map((w) => `/hero-${w}.${ext} ${w}w`).join(", ");

/**
 * The client's poster, used whole — it already carries the wordmark, the gold
 * arc and the meadow, so nothing here redraws them. It is always full width and
 * always above the form.
 *
 * The poster is about 16:9, and at full width on a desktop that makes it taller
 * than the viewport on its own. So `wide` screens take every pixel the compact
 * form leaves over — around three quarters of the poster's height — and
 * `object-position: center 40%` splits the loss so the fine texture at the very
 * top goes before the meadow does. What survives is the wordmark, the gold arc,
 * the sun, and the upper part of the wildflowers.
 *
 * `min-h-[38vw]` is the floor. Below roughly 68% of the poster's natural height
 * a 40% share of the crop starts reaching the lettering, so rather than clip it
 * the frame stops shrinking and the page scrolls.
 *
 * Below `wide` a poster-shaped frame would be a thin strip on a phone, so the
 * frame is squarer and `cover` trims sky from the sides instead. Both ratios
 * stay wide enough that the wordmark, which spans about 44% of the poster's
 * width, is never touched.
 */
export function HeroPoster() {
  return (
    <div className="relative aspect-[5/4] w-full shrink-0 sm:aspect-[3/2] wide:aspect-auto wide:min-h-[38vw] wide:flex-1 wide:shrink">
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={srcSet("webp")} sizes="100vw" />
        <img
          src="/hero-1536.jpg"
          alt="A sunset over a meadow of blue wildflowers, beneath a deep blue and gold crest"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] wide:object-[center_40%]"
        />
      </picture>

      {/* Carries the photograph down into the page colour so the lower edge
          doesn't read as a hard line above the form. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-navy-deep sm:h-16 wide:h-16"
      />
    </div>
  );
}
