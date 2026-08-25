/**
 * The scattered gold flecks from the flyer. Positions are a fixed list rather
 * than random so the render is stable between server and client.
 */
const FLECKS: [x: number, y: number, r: number, o: number][] = [
  [4, 12, 1.1, 0.5], [9, 30, 0.7, 0.35], [13, 6, 1.4, 0.6], [17, 22, 0.9, 0.45],
  [21, 44, 1.2, 0.55], [24, 14, 0.6, 0.3], [28, 38, 1.5, 0.65], [31, 58, 1, 0.5],
  [34, 25, 0.8, 0.4], [37, 66, 1.3, 0.6], [40, 47, 1.6, 0.7], [43, 72, 1, 0.55],
  [46, 60, 1.8, 0.75], [49, 80, 1.2, 0.6], [52, 68, 1.5, 0.7], [55, 55, 1, 0.5],
  [58, 76, 1.4, 0.65], [61, 42, 0.9, 0.45], [64, 63, 1.2, 0.55], [67, 33, 1.5, 0.6],
  [70, 52, 0.8, 0.4], [73, 20, 1.1, 0.5], [77, 40, 1.3, 0.55], [80, 10, 0.7, 0.35],
  [84, 28, 1.4, 0.6], [88, 16, 0.9, 0.45], [92, 34, 1.1, 0.5], [96, 8, 0.6, 0.3],
];

export function GoldDust({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      {FLECKS.map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r / 4} fill="#f4e3b6" opacity={o} />
      ))}
    </svg>
  );
}
