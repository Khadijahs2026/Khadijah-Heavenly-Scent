const WIDTHS = [640, 1024, 1536, 2048, 2732];

const srcSet = (ext: string) =>
  WIDTHS.map((w) => `/hero-${w}.${ext} ${w}w`).join(", ");

/**
 * The client's poster, used whole — it already carries the wordmark, the gold
 * arc and the meadow, so nothing here redraws them.
 *
 * The poster is landscape (roughly 16:9) and phones are not. Two layouts:
 *
 * - Portrait and small screens: a band at the top of the page, stepping through
 *   aspect ratios rather than being cropped to the viewport. It gets squarer as
 *   the screen narrows and loses sky at the left and right; both ratios stay
 *   wide enough that the wordmark, which spans about 44% of the poster, never
 *   reaches the crop. The form sits below.
 *
 * - `wide` (landscape, 1024px and up): the poster fills the screen and the form
 *   is laid over it, so the two stop competing for vertical space. At any
 *   viewport between 1:1 and 4.6:1 the crop cannot reach the lettering, which
 *   covers every real desktop and then some.
 */
export function HeroPoster() {
  return (
    <div className="relative aspect-[5/4] w-full sm:aspect-[3/2] wide:absolute wide:inset-0 wide:aspect-auto">
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={srcSet("webp")} sizes="100vw" />
        <img
          src="/hero-1536.jpg"
          alt="A sunset over a meadow of blue wildflowers, beneath a deep blue and gold crest"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
        />
      </picture>

      {/* Stacked layout: carries the meadow into the page colour so there is no
          seam between the photograph and the section beneath it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-navy-deep sm:h-16 wide:hidden"
      />


    </div>
  );
}
