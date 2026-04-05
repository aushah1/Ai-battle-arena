import { PHASES } from '../state/battleState';

/**
 * JudgePanel - The judge scoreboard with scores, reasoning, and winner declaration
 * Uses gold accent theme for the referee aesthetic
 */
export default function JudgePanel({ phase, judge, winner }) {
  const isJudging = phase === PHASES.JUDGE || phase === PHASES.WINNER;
  const showWinner = phase === PHASES.WINNER;

  if (!isJudging) return null;

  const s1Score = Number(judge?.solution_1_score || 0);
  const s2Score = Number(judge?.solution_2_score || 0);
  const maxScore = Math.max(s1Score, s2Score, 10);

  return (
    <section
      id="judge-panel"
      className="w-full max-w-5xl mx-auto px-4 py-6 animate-slide-up"
    >
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: 'rgba(30, 30, 47, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 221, 76, 0.15)',
          boxShadow: showWinner
            ? '0 0 40px rgba(255, 221, 76, 0.15), 0 20px 40px rgba(0,0,0,0.4)'
            : '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Gold Top Bar */}
        <div
          className="h-[2px] w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #ffdd4c, #e4c000, #ffdd4c, transparent)',
          }}
        />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚖️</span>
            <h3
              className="text-sm font-bold uppercase tracking-[0.15em]"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#ffdd4c',
                textShadow: '0 0 10px rgba(255, 221, 76, 0.3)',
              }}
            >
              Judge Evaluation
            </h3>
          </div>

          {/* Winner Declaration */}
          {showWinner && (
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded animate-scale-in"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 221, 76, 0.15), rgba(228, 192, 0, 0.05))',
                border: '1px solid rgba(255, 221, 76, 0.3)',
              }}
            >
              <span className="text-sm">🏆</span>
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#ffdd4c',
                }}
              >
                {winner ? `Model ${winner} Wins!` : "It's a Tie!"}
              </span>
            </div>
          )}
        </div>

        {/* Score Bars */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model 1 Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#a8e8ff',
                  }}
                >
                  AI Model 1
                </span>
                <span
                  className="text-lg font-bold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#a8e8ff',
                    textShadow: '0 0 10px rgba(0, 212, 255, 0.4)',
                  }}
                >
                  {s1Score}
                  <span className="text-xs text-on-surface-variant font-normal">/10</span>
                </span>
              </div>
              {/* Score bar */}
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-container-lowest)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(s1Score / maxScore) * 100}%`,
                    background: 'linear-gradient(90deg, #00d4ff, #a8e8ff)',
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                  }}
                />
              </div>
            </div>

            {/* Model 2 Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#ddb7ff',
                  }}
                >
                  AI Model 2
                </span>
                <span
                  className="text-lg font-bold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#ddb7ff',
                    textShadow: '0 0 10px rgba(168, 85, 247, 0.4)',
                  }}
                >
                  {s2Score}
                  <span className="text-xs text-on-surface-variant font-normal">/10</span>
                </span>
              </div>
              {/* Score bar */}
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-container-lowest)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(s2Score / maxScore) * 100}%`,
                    background: 'linear-gradient(90deg, #a855f7, #ddb7ff)',
                    boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reasoning Section */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model 1 Reasoning */}
            <div
              className="rounded-md p-4"
              style={{ background: 'var(--color-surface-container-lowest)' }}
            >
              <h4
                className="text-xs font-semibold uppercase tracking-[0.1em] mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#a8e8ff',
                }}
              >
                Reasoning — Model 1
              </h4>
              <p
                className="text-sm leading-relaxed text-on-surface-variant"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {judge?.solution_1_reasoning || 'No reasoning provided.'}
              </p>
            </div>

            {/* Model 2 Reasoning */}
            <div
              className="rounded-md p-4"
              style={{ background: 'var(--color-surface-container-lowest)' }}
            >
              <h4
                className="text-xs font-semibold uppercase tracking-[0.1em] mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#ddb7ff',
                }}
              >
                Reasoning — Model 2
              </h4>
              <p
                className="text-sm leading-relaxed text-on-surface-variant"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {judge?.solution_2_reasoning || 'No reasoning provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
