import ScorePanel from "./ScorePanel";
import LoadingSkeleton from "./LoadingSkeleton";

export default function BattleView({ battle }) {
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
    <div className="flex-1 flex overflow-hidden">
      {/* ─── Left Column: Battle Content ─── */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* User Prompt */}
        <div className="flex items-start gap-3 mb-8 animate-fade-in">
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              You
            </span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-purple/40 to-neon-cyan/40 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-cyan">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="max-w-2xl ml-auto mb-8 animate-fade-in-up">
          <div className="bg-bg-elevated rounded-2xl px-6 py-5 border border-border-card">
            <p className="text-sm text-text-primary leading-relaxed font-medium">
              {problem}
            </p>
          </div>
        </div>

        {/* Solutions */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <div className="max-w-2xl animate-fade-in-up">
            <div className="bg-bg-card rounded-2xl border border-red-500/20 px-6 py-5">
              <p className="text-red-400 font-medium text-sm">
                Something went wrong. Please try again.
              </p>
              <p className="text-text-muted text-xs mt-1">{battle.error}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Show only the winning solution, or both if no winner */}
            {winner === 1 || !winner ? (
              solution_1 && (
                <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <SolutionBlock
                    content={solution_1}
                    model="Mistral"
                    modelTag="Model A"
                    score={judge?.solution_1_score}
                    isWinner={winner === 1}
                  />
                </div>
              )
            ) : null}

            {winner === 2 || !winner ? (
              solution_2 && (
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <SolutionBlock
                    content={solution_2}
                    model="Cohere"
                    modelTag="Model B"
                    score={judge?.solution_2_score}
                    isWinner={winner === 2}
                  />
                </div>
              )
            ) : null}
          </>
        )}
      </div>

      {/* ─── Right Column: Score Panel ─── */}
      {!isLoading && judge && (
        <div className="w-[340px] flex-shrink-0 border-l border-border-subtle overflow-y-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <ScorePanel judge={judge} winner={winner} solution1={solution_1} solution2={solution_2} />
        </div>
      )}

      {/* Right column placeholder during loading */}
      {isLoading && (
        <div className="w-[340px] flex-shrink-0 border-l border-border-subtle overflow-y-auto">
          <div className="p-6">
            <div className="h-3 w-28 rounded-full animate-shimmer mb-6" />
            <div className="h-3 w-full rounded-full animate-shimmer mb-3" />
            <div className="h-3 w-full rounded-full animate-shimmer mb-3" />
            <div className="h-3 w-3/4 rounded-full animate-shimmer" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Solution Block Sub-Component ─── */
function SolutionBlock({ content, model, modelTag, score, isWinner }) {
  // Check if content looks like code (contains common code patterns)
  const hasCode = /```[\s\S]*```|function |const |import |class |def |type |interface /.test(content);

  // Split content into text and code blocks
  const renderContent = () => {
    if (!hasCode) {
      return (
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      );
    }

    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```\w*\n?/, "").replace(/```$/, "");
        return (
          <pre
            key={i}
            className="bg-bg-code rounded-xl p-4 my-3 overflow-x-auto border border-border-subtle"
          >
            <code className="text-xs text-neon-cyan font-mono leading-relaxed">
              {code}
            </code>
          </pre>
        );
      }
      return (
        <p key={i} className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="max-w-2xl">
      {/* Content */}
      <div className=" pr-1 mb-4">
        {renderContent()}
      </div>

      {/* Model Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
            {model}
          </span>
        </div>
        {score !== undefined && (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isWinner
                ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30"
                : "bg-bg-elevated text-text-secondary border-border-card"
              }`}
          >
            Score: {score}
          </span>
        )}
      </div>
    </div>
  );
}
