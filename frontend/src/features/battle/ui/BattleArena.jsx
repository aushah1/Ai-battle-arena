import { PHASES } from '../state/battleState';
import SolutionCard from './SolutionCard';

/**
 * BattleArena - The split-screen arena with VS badge
 * Contains both SolutionCards and the central VS element
 */
export default function BattleArena({ phase, solution1, solution2, winner }) {
  const isBattleActive = phase !== PHASES.IDLE;
  const showVS = isBattleActive;

  return (
    <section id="battle-arena" className="w-full max-w-6xl mx-auto px-4 py-4">
      <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-4 items-stretch">
        {/* Model 1 - Blue Side */}
        <SolutionCard
          modelNumber={1}
          solution={solution1}
          phase={phase}
          isWinner={winner === 1}
          winner={winner}
        />

        {/* VS Badge - Centered */}
        <div className="flex items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10">
          <div
            className={`
              relative flex items-center justify-center
              w-16 h-16 lg:w-20 lg:h-20 rounded-full
              transition-all duration-500
              ${showVS ? 'animate-vs-pulse' : ''}
            `}
            style={{
              background: showVS
                ? 'radial-gradient(circle, rgba(255, 221, 76, 0.15), rgba(228, 192, 0, 0.05))'
                : 'radial-gradient(circle, rgba(60, 73, 78, 0.2), transparent)',
              border: `2px solid ${showVS ? 'rgba(255, 221, 76, 0.4)' : 'rgba(60, 73, 78, 0.3)'}`,
              boxShadow: showVS
                ? '0 0 30px rgba(255, 221, 76, 0.2), 0 0 60px rgba(255, 221, 76, 0.05)'
                : 'none',
            }}
          >
            <span
              className="text-2xl lg:text-3xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: showVS ? '#ffdd4c' : '#3c494e',
                textShadow: showVS
                  ? '0 0 15px rgba(255, 221, 76, 0.6)'
                  : 'none',
              }}
            >
              VS
            </span>

            {/* Orbiting ring effect */}
            {showVS && (
              <div
                className="absolute inset-[-6px] rounded-full border border-tertiary/20 animate-spin"
                style={{ animationDuration: '8s' }}
              />
            )}
          </div>
        </div>

        {/* Model 2 - Purple Side */}
        <SolutionCard
          modelNumber={2}
          solution={solution2}
          phase={phase}
          isWinner={winner === 2}
          winner={winner}
        />
      </div>
    </section>
  );
}
