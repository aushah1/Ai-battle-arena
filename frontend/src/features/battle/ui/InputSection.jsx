import { useState } from "react";

/**
 * InputSection - The battle challenge input area
 * Glassmorphism panel with neon-focused textarea and CTA button
 */
export default function InputSection({ onStartBattle, isActive, isLoading }) {
  const [problem, setProblem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (problem.trim() && !isLoading) {
      onStartBattle(problem);
      setProblem("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <section
      id="input-section"
      className="w-full max-w-3xl mx-auto px-4 pt-6 pb-8">
      <form onSubmit={handleSubmit} className="relative">
        {/* Label */}
        <label
          htmlFor="battle-prompt"
          className="block text-xs font-semibold uppercase tracking-[0.15em] text-on-surface-variant mb-3"
          style={{ fontFamily: "var(--font-display)" }}>
          Enter Challenge
        </label>

        {/* Textarea Container */}
        <div className="relative group">
          <textarea
            id="battle-prompt"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe a problem for the AI models to solve..."
            disabled={isLoading}
            rows={3}
            className="w-full resize-none rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline
                       p-4 pr-32 text-sm leading-relaxed
                       border border-outline-variant/20
                       focus:outline-none focus:border-primary-container/50
                       transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-body)" }}
          />

          {/* Glow line on focus */}
          <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary-container/0 group-focus-within:bg-primary-container/60 transition-all duration-300 rounded-full" />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!problem.trim() || isLoading}
            className="absolute right-3 bottom-3 px-5 py-2.5 rounded-lg
                       text-xs font-bold uppercase tracking-wider
                       transition-all duration-200
                       disabled:opacity-30 disabled:cursor-not-allowed
                       hover:scale-105 active:scale-95 active:animate-flicker
                       cursor-pointer"
            style={{
              fontFamily: "var(--font-display)",
              background:
                problem.trim() && !isLoading
                  ? "linear-gradient(135deg, #a8e8ff, #00d4ff)"
                  : "rgba(60, 73, 78, 0.3)",
              color: problem.trim() && !isLoading ? "#003642" : "#859398",
              boxShadow:
                problem.trim() && !isLoading
                  ? "0 0 20px rgba(0, 212, 255, 0.3)"
                  : "none",
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
            }}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Fighting...
              </span>
            ) : isActive ? (
              "New Battle"
            ) : (
              "⚔ Start Battle"
            )}
          </button>
        </div>

        {/* Error messaging handled by parent */}
      </form>
    </section>
  );
}
