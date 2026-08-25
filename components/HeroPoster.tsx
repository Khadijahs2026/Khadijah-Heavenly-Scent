const WIDTHS = [640, 1024, 1536, 2048, 2732];

const srcSet = (ext: string) =>
  WIDTHS.map((w) => `/hero-${w}.${ext} ${w}w`).join(", ");

/**
 * The client's poster, used whole — it already carries the wordmark, the gold
 * arc and the meadow, so nothing here redraws them. It always sits above the
 * form; nothing is ever laid over it.
 *
 * The poster is about 16:9 and no screen shape matches that once the form has
 * taken its share of the height, so the two sizes solve it differently:
 *
 * - Phones and portrait tablets: the frame is squarer than the poster, so
 *   `cover` trims sky from the left and right. Both ratios stay wide enough
 *   that the wordmark, spanning ~44% of the poster, never reaches the crop.
 *
 * - `wide` screens: the frame is far wider than the poster, so `cover` would
 *   have to throw away roughly a third of its height — which is what was
 *   cutting off the wildflowers. `contain` instead fits the poster whole and a
 *   blurred copy of itself fills the space either side, so nothing is lost.
 */
export function HeroPoster() {
  return (
    <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden sm:aspect-[3/2] wide:aspect-auto wide:max-h-[72vh] wide:min-h-0 wide:flex-1 wide:shrink">
      {/* Fills the margins either side of the fitted poster. Decorative, and
          deliberately the smallest source — it is blurred past recognition. */}
      <img
        src="/hero-640.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full scale-110 object-cover opacity-45 blur-2xl wide:block"
      />
      {/* Settles the blurred margins toward the brand navy so they read as
          background and the poster keeps the eye. Sits under the poster. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-navy-deep/55 wide:block"
      />

      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={srcSet("webp")} sizes="100vw" />
        <img
          src="/hero-1536.jpg"
          alt="A sunset over a meadow of blue wildflowers, beneath a deep blue and gold crest"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] wide:object-contain wide:object-center"
        />
      </picture>

      {/* Carries the photograph down into the page colour so the lower edge
          doesn't read as a hard line above the form. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-navy-deep sm:h-16 wide:h-20"
      />
    </div>
  );
}
