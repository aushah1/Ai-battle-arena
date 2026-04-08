import { useBattle } from "../hooks/useBattle";
import { PHASES } from "../state/battleState";
import InputSection from "./InputSection";
import BattleArena from "./BattleArena";
import JudgePanel from "./JudgePanel";

/**
 * BattlePage - Root page component for the AI Battle Arena
 * Composes all UI sections and connects them via the useBattle hook
 */
export default function BattlePage() {
  const {
    phase,
    solution1,
    solution2,
    judge,
    winner,
    error,
    isActive,
    isLoading,
    startBattle,
    resetBattle,
  } = useBattle();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== Header ===== */}
      <header className="w-full py-6 px-4 text-center relative">
        {/* Decorative background text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true">
          <span
            className="text-[8rem] lg:text-[12rem] font-bold uppercase opacity-[0.02] leading-none"
            style={{ fontFamily: "var(--font-display)" }}>
            ARENA
          </span>
        </div>

        <h1
          className="text-3xl lg:text-4xl font-bold uppercase tracking-[0.2em] relative"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #a8e8ff, #00d4ff, #ddb7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          AI Battle Arena
        </h1>
        <p
          className="text-xs uppercase tracking-[0.25em] text-on-surface-variant mt-2"
          style={{ fontFamily: "var(--font-display)" }}>
          Two Models • One Challenge • One Winner
        </p>

        {/* Phase indicator */}
        {isActive && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {Object.values(PHASES)
              .filter((p) => p !== PHASES.IDLE)
              .map((p) => (
                <div key={p} className="flex items-center gap-1.5">
                  <div
                    className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-300
                    ${phase === p ? "scale-150" : ""}
                  `}
                    style={{
                      background:
                        phase === p
                          ? "#ffdd4c"
                          : Object.values(PHASES).indexOf(phase) >
                              Object.values(PHASES).indexOf(p)
                            ? "#00d4ff"
                            : "#3c494e",
                      boxShadow:
                        phase === p
                          ? "0 0 8px rgba(255, 221, 76, 0.6)"
                          : "none",
                    }}
                  />
                  <span
                    className={`text-[10px] uppercase tracking-wider hidden sm:inline ${
                      phase === p ? "text-tertiary" : "text-outline-variant"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}>
                    {p}
                  </span>
                </div>
              ))}
          </div>
        )}
      </header>

      {/* ===== Input Section ===== */}
      <InputSection
        onStartBattle={startBattle}
        isActive={isActive}
        isLoading={isLoading}
      />

      {/* ===== Error Display ===== */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 pb-4 animate-fade-in">
          <div
            className="rounded-lg px-4 py-3 text-sm flex items-center gap-3"
            style={{
              background: "rgba(147, 0, 10, 0.15)",
              border: "1px solid rgba(255, 180, 171, 0.2)",
              color: "#ffb4ab",
              fontFamily: "var(--font-body)",
            }}>
            <span>⚠</span>
            {error}
            <button
              onClick={resetBattle}
              className="ml-auto text-xs uppercase tracking-wider font-bold hover:text-on-surface transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-display)" }}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ===== Loading State ===== */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
          {/* Glitch loader */}
          <div className="relative w-16 h-16 mb-6">
            <div
              className="absolute inset-0 rounded-full border-2 border-primary-container/30 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute inset-1 rounded-full border-2 border-secondary-container/30 animate-spin"
              style={{ animationDuration: "2s", animationDirection: "reverse" }}
            />
            <div
              className="absolute inset-3 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent)",
              }}
            />
          </div>
          <span
            className="text-sm uppercase tracking-[0.2em] text-on-surface-variant animate-pulse-glow"
            style={{ fontFamily: "var(--font-display)" }}>
            Initiating Battle Sequence...
          </span>
        </div>
      )}

      {/* ===== Battle Arena ===== */}
      {phase !== PHASES.IDLE && phase !== PHASES.LOADING && (
        <BattleArena
          phase={phase}
          solution1={solution1}
          solution2={solution2}
          winner={winner}
        />
      )}

      {/* ===== Judge Panel ===== */}
      <JudgePanel phase={phase} judge={judge} winner={winner} />

      {/* ===== Reset Button ===== */}
      {phase === PHASES.WINNER && (
        <div className="flex justify-center pb-10 animate-fade-in">
          <button
            onClick={resetBattle}
            className="px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-wider
                       border border-outline-variant/30 text-on-surface-variant
                       hover:border-primary-container/40 hover:text-primary
                       hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]
                       transition-all duration-300 cursor-pointer"
            style={{ fontFamily: "var(--font-display)" }}>
            ⚔ New Battle
          </button>
        </div>
      )}

      {/* ===== Footer ===== */}
      <footer className="mt-auto py-4 text-center">
        <p
          className="text-[10px] uppercase tracking-[0.2em] text-outline-variant"
          style={{ fontFamily: "var(--font-display)" }}>
          AI Clash Platform • Next Generation
        </p>
      </footer>
    </div>
  );
}
