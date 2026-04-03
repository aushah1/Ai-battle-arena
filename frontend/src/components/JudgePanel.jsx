export default function JudgePanel({ judge, winner }) {
  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judge;

  const maxScore = 10;

  return (
    <div className="bg-surface-low px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Judge Verdict — Gemini
        </h3>
      </div>

      {/* Score Comparison Bars */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Solution 1 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">
              Solution 1 · Mistral
            </span>
            <span
              className={`text-sm font-bold tabular-nums ${
                winner === 1 ? "text-tertiary" : "text-on-surface"
              }`}
            >
              {solution_1_score}/{maxScore}
            </span>
          </div>
          <div className="h-2 bg-surface-container rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full animate-score-reveal transition-all duration-700 ${
                winner === 1
                  ? "bg-tertiary"
                  : "bg-primary"
              }`}
              style={{ width: `${(solution_1_score / maxScore) * 100}%` }}
            />
          </div>
        </div>

        {/* Solution 2 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">
              Solution 2 · Cohere
            </span>
            <span
              className={`text-sm font-bold tabular-nums ${
                winner === 2 ? "text-tertiary" : "text-on-surface"
              }`}
            >
              {solution_2_score}/{maxScore}
            </span>
          </div>
          <div className="h-2 bg-surface-container rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full animate-score-reveal transition-all duration-700 ${
                winner === 2
                  ? "bg-tertiary"
                  : "bg-primary"
              }`}
              style={{
                width: `${(solution_2_score / maxScore) * 100}%`,
                animationDelay: "0.2s",
              }}
            />
          </div>
        </div>
      </div>

      {/* Reasoning Sections */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-surface-card rounded-xl p-5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant block mb-3">
            Reasoning — Solution 1
          </span>
          <p className="text-sm text-on-surface leading-relaxed max-h-[160px] overflow-y-auto">
            {solution_1_reasoning}
          </p>
        </div>
        <div className="bg-surface-card rounded-xl p-5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant block mb-3">
            Reasoning — Solution 2
          </span>
          <p className="text-sm text-on-surface leading-relaxed max-h-[160px] overflow-y-auto">
            {solution_2_reasoning}
          </p>
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div className="mt-6 bg-tertiary-container/30 rounded-xl px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-on-tertiary-container"
            >
              <path d="M5 3h14l-1.5 6H6.5L5 3zM3 3H1v2h2V3zm18 0h2v2h-2V3zM12 15a3 3 0 100-6 3 3 0 000 6zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-on-tertiary-container">
              Solution {winner} wins this battle
            </p>
            <p className="text-xs text-tertiary">
              {winner === 1 ? "Mistral" : "Cohere"} scored{" "}
              {winner === 1 ? solution_1_score : solution_2_score}/10
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
