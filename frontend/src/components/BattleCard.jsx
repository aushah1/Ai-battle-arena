import SolutionPanel from "./SolutionPanel";
import JudgePanel from "./JudgePanel";
import LoadingSkeleton from "./LoadingSkeleton";

export default function BattleCard({ battle }) {
  const { problem, solution_1, solution_2, judge, status } = battle;

  const isLoading = status === "loading";
  const isError = status === "error";

  const winner =
    judge && judge.solution_1_score !== judge.solution_2_score
      ? judge.solution_1_score > judge.solution_2_score
        ? 1
        : 2
      : null;

  return (
    <article className="bg-surface-card rounded-2xl shadow-[0_12px_32px_-4px_rgba(45,52,53,0.06)] overflow-hidden">
      {/* Problem Section */}
      <div className="px-8 pt-8 pb-6">
        <span className="inline-block text-xs font-medium uppercase tracking-widest text-on-surface-variant mb-2">
          Problem
        </span>
        <h2 className="text-xl font-semibold text-on-surface leading-relaxed">
          {problem}
        </h2>
      </div>

      {/* Solutions or Loading */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div className="mx-8 mb-8 rounded-xl bg-error-container/20 px-6 py-5">
          <p className="text-error font-medium text-sm">
            Something went wrong. Please try again.
          </p>
          <p className="text-on-surface-variant text-xs mt-1">
            {battle.error}
          </p>
        </div>
      ) : (
        <>
          {/* Two-column Solutions */}
          <div className="grid grid-cols-2 gap-0">
            <SolutionPanel
              label="Solution 1"
              model="Mistral"
              content={solution_1}
              score={judge?.solution_1_score}
              isWinner={winner === 1}
              side="left"
            />
            <SolutionPanel
              label="Solution 2"
              model="Cohere"
              content={solution_2}
              score={judge?.solution_2_score}
              isWinner={winner === 2}
              side="right"
            />
          </div>

          {/* Judge Panel */}
          {judge && (
            <JudgePanel judge={judge} winner={winner} />
          )}
        </>
      )}
    </article>
  );
}
