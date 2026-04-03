import { useState } from "react";

export default function InputSection({ onSubmit, isLoading }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <section id="input-section" className="mt-10">
      <div className="bg-surface-card rounded-2xl p-8 shadow-[0_12px_32px_-4px_rgba(45,52,53,0.06)]">
        <label
          htmlFor="problem-input"
          className="block text-xs font-medium uppercase tracking-widest text-on-surface-variant mb-4"
        >
          Submit a Problem
        </label>
        <form onSubmit={handleSubmit} className="flex gap-3 items-start">
          <textarea
            id="problem-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your problem..."
            rows={3}
            className="flex-1 bg-surface-low rounded-xl px-5 py-4 text-base text-on-surface
                       placeholder:text-outline-variant resize-none
                       focus:outline-none focus:ring-2 focus:ring-outline/20
                       transition-all duration-200"
          />
          <button
            id="start-battle-btn"
            type="submit"
            disabled={isLoading || !value.trim()}
            className="px-6 py-4 rounded-xl font-medium text-sm
                       bg-gradient-to-b from-primary to-primary-dim text-on-primary
                       hover:shadow-lg hover:shadow-primary/10
                       active:scale-[0.97]
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-200 cursor-pointer
                       whitespace-nowrap"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Battling…
              </span>
            ) : (
              "Start Battle"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
