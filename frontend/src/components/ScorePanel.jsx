import { useState } from "react";
import SolutionModal from "./SolutionModal";

export default function ScorePanel({ judge, winner, solution1, solution2 }) {
  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judge;

  const maxScore = 10;
  const [modalData, setModalData] = useState(null);

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">
          AI Comparison
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
          V3.4 Active
        </span>
      </div>

      {/* Real-Time Scores */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">
          Real-Time Scores
        </h3>

        {/* Model A Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${winner === 1 ? 'text-neon-cyan' : 'text-text-secondary'}`}>
              Mistral (Model A)
            </span>
            <span className={`text-xs font-bold tabular-nums ${winner === 1 ? 'text-neon-cyan' : 'text-text-primary'}`}>
              {solution_1_score}
            </span>
          </div>
          <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full animate-score-bar ${
                winner === 1
                  ? "bg-gradient-to-r from-neon-cyan to-neon-green"
                  : "bg-gradient-to-r from-neon-purple-dim to-neon-purple"
              }`}
              style={{ width: `${(solution_1_score / maxScore) * 100}%` }}
            />
          </div>
        </div>

        {/* Model B Bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${winner === 2 ? 'text-neon-cyan' : 'text-text-secondary'}`}>
              Cohere (Model B)
            </span>
            <span className={`text-xs font-bold tabular-nums ${winner === 2 ? 'text-neon-cyan' : 'text-text-primary'}`}>
              {solution_2_score}
            </span>
          </div>
          <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full animate-score-bar ${
                winner === 2
                  ? "bg-gradient-to-r from-neon-cyan to-neon-green"
                  : "bg-gradient-to-r from-neon-purple-dim to-neon-purple"
              }`}
              style={{
                width: `${(solution_2_score / maxScore) * 100}%`,
                animationDelay: "0.2s",
              }}
            />
          </div>
        </div>
      </div>

      {/* Reasoning Cards */}
      <div className="flex flex-col gap-4">
        {/* Solution A Reasoning */}
        <div className={`rounded-xl p-4 border-l-2 ${
          winner === 1 ? 'border-l-neon-cyan bg-neon-cyan/5' : 'border-l-neon-purple bg-bg-card'
        }`}>
          <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
            winner === 1 ? 'text-neon-cyan' : 'text-neon-purple'
          }`}>
            Why Solution A scored {solution_1_score}
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed max-h-[100px] overflow-y-auto">
            {solution_1_reasoning}
          </p>
          <button
            onClick={() => setModalData({ model: "Mistral", content: solution1 })}
            className="text-[10px] font-semibold text-neon-cyan mt-2 hover:underline cursor-pointer uppercase tracking-wider"
          >
            View Solution
          </button>
        </div>

        {/* Solution B Reasoning */}
        <div className={`rounded-xl p-4 border-l-2 ${
          winner === 2 ? 'border-l-neon-cyan bg-neon-cyan/5' : 'border-l-neon-purple bg-bg-card'
        }`}>
          <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
            winner === 2 ? 'text-neon-cyan' : 'text-neon-purple'
          }`}>
            Why Solution B scored {solution_2_score}
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed max-h-[100px] overflow-y-auto">
            {solution_2_reasoning}
          </p>
          <button
            onClick={() => setModalData({ model: "Cohere", content: solution2 })}
            className="text-[10px] font-semibold text-neon-cyan mt-2 hover:underline cursor-pointer uppercase tracking-wider"
          >
            View Solution
          </button>
        </div>
      </div>

      {/* Export Data Button */}
      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-border-card
                         text-xs font-bold uppercase tracking-widest text-neon-cyan
                         hover:from-neon-cyan/30 hover:to-neon-purple/30
                         transition-all duration-300 cursor-pointer">
        Export Data
      </button>

      {/* Solution Modal */}
      <SolutionModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        model={modalData?.model || ""}
        content={modalData?.content || ""}
      />
    </div>
  );
}
