import { useState } from "react";

export default function InputBar({ onSubmit, isLoading }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSubmit(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-border-subtle px-8 py-4 bg-bg-base/80 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            id="problem-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Propose a new battle prompt..."
            disabled={isLoading}
            className="w-full bg-bg-input rounded-xl px-5 py-3.5 text-sm text-text-primary
                       placeholder:text-text-muted border border-border-card
                       focus:outline-none focus:border-neon-cyan/30 focus:shadow-[0_0_20px_rgba(0,229,204,0.08)]
                       disabled:opacity-40
                       transition-all duration-300"
          />
        </div>
        <button
          id="start-battle-btn"
          type="submit"
          disabled={isLoading || !value.trim()}
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                     bg-gradient-to-br from-neon-cyan to-neon-cyan-dim text-bg-deep
                     hover:shadow-[0_0_20px_rgba(0,229,204,0.3)]
                     active:scale-95
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all duration-200 cursor-pointer"
        >
          {isLoading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
