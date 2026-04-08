import React from "react";
import ReactMarkdown from "react-markdown";
import { PHASES } from "../state/battleState";

/**
 * SolutionCard - Displays an AI model's solution with markdown rendering
 * Blue glow for Model 1, Purple glow for Model 2
 */
export default function SolutionCard({ modelNumber, solution, phase, winner }) {
  const isBlue = modelNumber === 1;
  const phaseIndex = [
    PHASES.SOLUTION1,
    PHASES.SOLUTION2,
    PHASES.JUDGE,
    PHASES.WINNER,
  ];
  const requiredPhase = modelNumber === 1 ? PHASES.SOLUTION1 : PHASES.SOLUTION2;
  const isVisible =
    phaseIndex.indexOf(phase) >= phaseIndex.indexOf(requiredPhase);
  const isBattleActive = phase !== PHASES.IDLE;
  const isThisWinner = winner === modelNumber;
  const showWinnerEffect = phase === PHASES.WINNER && isThisWinner;
  const showLoserEffect = phase === PHASES.WINNER && winner && !isThisWinner;

  return (
    <div
      className={`
        relative flex-1 min-w-0 rounded-lg overflow-hidden transition-all duration-700
        ${showWinnerEffect ? "animate-winner-glow" : ""}
        ${showLoserEffect ? "opacity-50" : ""}
      `}
      style={{
        background: "rgba(30, 30, 47, 0.6)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${isBlue ? "rgba(0, 212, 255, 0.15)" : "rgba(168, 85, 247, 0.15)"}`,
        animation: isVisible
          ? `${isBlue ? "glow-pulse-blue" : "glow-pulse-purple"} 2s ease-in-out infinite`
          : "none",
      }}>
      {/* Top Glow Bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: isBlue
            ? "linear-gradient(90deg, transparent, #00d4ff, transparent)"
            : "linear-gradient(90deg, transparent, #a855f7, transparent)",
          opacity: isBattleActive ? 1 : 0.3,
          transition: "opacity 0.5s",
        }}
      />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${isBattleActive ? "animate-pulse" : ""}`}
            style={{
              background: isBlue ? "#00d4ff" : "#a855f7",
              boxShadow: isBattleActive
                ? `0 0 8px ${isBlue ? "rgba(0, 212, 255, 0.6)" : "rgba(168, 85, 247, 0.6)"}`
                : "none",
            }}
          />
          <h3
            className="text-sm font-bold uppercase tracking-[0.12em]"
            style={{
              fontFamily: "var(--font-display)",
              color: isBlue ? "#a8e8ff" : "#ddb7ff",
            }}>
            AI Model {modelNumber}
          </h3>
        </div>

        {/* Winner Badge */}
        {showWinnerEffect && (
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded animate-scale-in"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #ffdd4c, #e4c000)",
              color: "#3a3000",
            }}>
            ★ Winner
          </span>
        )}
      </div>

      {/* Solution Content */}
      <div className="px-5 pb-5 min-h-50">
        {!isBattleActive && (
          <div className="flex items-center justify-center h-[ text-outline text-sm">
            <span style={{ fontFamily: "var(--font-display)" }}>
              Awaiting Challenge...
            </span>
          </div>
        )}

        {isBattleActive && !isVisible && (
          <div className="flex flex-col items-center justify-center h-50 gap-3">
            {/* Loading dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-typing"
                  style={{
                    background: isBlue ? "#00d4ff" : "#a855f7",
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
            <span
              className="text-xs uppercase tracking-[0.15em] text-on-surface-variant"
              style={{ fontFamily: "var(--font-display)" }}>
              Processing...
            </span>
          </div>
        )}

        {isVisible && solution && (
          <div className="animate-slide-up">
            {/* Solution text with markdown rendering */}
            <div
              className="rounded-md p-4 text-sm leading-relaxed max-h-100 overflow-y-auto"
              style={{
                fontFamily: "var(--font-body)",
                background: "var(--color-surface-container-lowest)",
                color: "var(--color-on-surface)",
              }}>
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-lg font-bold mt-3 mb-2" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-base font-bold mt-3 mb-2" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-sm font-bold mt-2 mb-1" {...props} />
                  ),
                  p: ({ ...props }) => <p className="mb-2" {...props} />,
                  code: ({ inline, ...props }) =>
                    inline ? (
                      <code
                        className="bg-black bg-opacity-30 px-1.5 py-0.5 rounded text-xs"
                        {...props}
                      />
                    ) : (
                      <code
                        className="block bg-black bg-opacity-50 p-3 rounded my-2 overflow-x-auto text-xs"
                        {...props}
                      />
                    ),
                  pre: ({ ...props }) => (
                    <pre
                      className="bg-black bg-opacity-50 p-3 rounded my-2 overflow-x-auto"
                      {...props}
                    />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc list-inside mb-2" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal list-inside mb-2" {...props} />
                  ),
                  li: ({ ...props }) => <li className="mb-1" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-2 border-purple-500 pl-3 italic my-2"
                      {...props}
                    />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-bold" {...props} />
                  ),
                  em: ({ ...props }) => <em className="italic" {...props} />,
                }}>
                {solution}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
