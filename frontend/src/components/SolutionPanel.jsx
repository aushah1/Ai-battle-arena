export default function SolutionPanel({
  label,
  model,
  content,
  score,
  isWinner,
  side,
}) {
  return (
    <div
      className={`px-8 py-6 ${
        side === "left" ? "border-r border-outline-variant/15" : ""
      } ${isWinner ? "bg-tertiary-container/8" : "bg-surface-low/50"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">
            {label}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-secondary-container text-on-secondary-container rounded-full">
            {model}
          </span>
        </div>
        {isWinner && (
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-tertiary-container text-on-tertiary-container rounded-full flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Winner
          </span>
        )}
      </div>

      {/* Score Badge */}
      {score !== undefined && (
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`text-2xl font-bold tabular-nums ${
              isWinner ? "text-tertiary" : "text-on-surface"
            }`}
          >
            {score}
          </span>
          <span className="text-sm text-on-surface-variant">/10</span>
        </div>
      )}

      {/* Content */}
      <div className="max-h-[280px] overflow-y-auto pr-2">
        <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}
