import { PHASES } from '../state/battleState';

/**
 * SolutionCard - Displays an AI model's solution
 * Blue glow for Model 1, Purple glow for Model 2
 */
export default function SolutionCard({ modelNumber, solution, phase, isWinner, winner }) {
  const isBlue = modelNumber === 1;
  const phaseIndex = [PHASES.SOLUTION1, PHASES.SOLUTION2, PHASES.JUDGE, PHASES.WINNER];
  const requiredPhase = modelNumber === 1 ? PHASES.SOLUTION1 : PHASES.SOLUTION2;
  const isVisible = phaseIndex.indexOf(phase) >= phaseIndex.indexOf(requiredPhase);
  const isBattleActive = phase !== PHASES.IDLE;
  const isThisWinner = winner === modelNumber;
  const showWinnerEffect = phase === PHASES.WINNER && isThisWinner;
  const showLoserEffect = phase === PHASES.WINNER && winner && !isThisWinner;

  return (
    <div
      className={`
        relative flex-1 min-w-0 rounded-lg overflow-hidden transition-all duration-700
        ${showWinnerEffect ? 'animate-winner-glow' : ''}
        ${showLoserEffect ? 'opacity-50' : ''}
      `}
      style={{
        background: 'rgba(30, 30, 47, 0.6)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${isBlue ? 'rgba(0, 212, 255, 0.15)' : 'rgba(168, 85, 247, 0.15)'}`,
        animation: isVisible
          ? `${isBlue ? 'glow-pulse-blue' : 'glow-pulse-purple'} 2s ease-in-out infinite`
          : 'none',
      }}
    >
      {/* Top Glow Bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: isBlue
            ? 'linear-gradient(90deg, transparent, #00d4ff, transparent)'
            : 'linear-gradient(90deg, transparent, #a855f7, transparent)',
          opacity: isBattleActive ? 1 : 0.3,
          transition: 'opacity 0.5s',
        }}
      />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${isBattleActive ? 'animate-pulse' : ''}`}
            style={{
              background: isBlue ? '#00d4ff' : '#a855f7',
              boxShadow: isBattleActive
                ? `0 0 8px ${isBlue ? 'rgba(0, 212, 255, 0.6)' : 'rgba(168, 85, 247, 0.6)'}`
                : 'none',
            }}
          />
          <h3
            className="text-sm font-bold uppercase tracking-[0.12em]"
            style={{
              fontFamily: 'var(--font-display)',
              color: isBlue ? '#a8e8ff' : '#ddb7ff',
            }}
          >
            AI Model {modelNumber}
          </h3>
        </div>

        {/* Winner Badge */}
        {showWinnerEffect && (
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded animate-scale-in"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #ffdd4c, #e4c000)',
              color: '#3a3000',
            }}
          >
            ★ Winner
          </span>
        )}
      </div>

      {/* Solution Content */}
      <div className="px-5 pb-5 min-h-[200px]">
        {!isBattleActive && (
          <div className="flex items-center justify-center h-[200px] text-outline text-sm">
            <span style={{ fontFamily: 'var(--font-display)' }}>
              Awaiting Challenge...
            </span>
          </div>
        )}

        {isBattleActive && !isVisible && (
          <div className="flex flex-col items-center justify-center h-[200px] gap-3">
            {/* Loading dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-typing"
                  style={{
                    background: isBlue ? '#00d4ff' : '#a855f7',
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
            <span
              className="text-xs uppercase tracking-[0.15em] text-on-surface-variant"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Processing...
            </span>
          </div>
        )}

        {isVisible && solution && (
          <div className="animate-slide-up">
            {/* Solution text with recessed background */}
            <div
              className="rounded-md p-4 text-sm leading-relaxed whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'var(--color-surface-container-lowest)',
                color: 'var(--color-on-surface)',
              }}
            >
              {solution}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
