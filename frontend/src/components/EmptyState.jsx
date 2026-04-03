export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 rounded-2xl bg-bg-card border border-border-card flex items-center justify-center mb-6 animate-neon-pulse">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neon-cyan"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight">
        Ready to battle
      </h3>
      <p className="text-sm text-text-muted max-w-[360px] leading-relaxed">
        Submit a problem below and watch two AI models go head-to-head. A judge
        will evaluate both solutions and declare a winner.
      </p>
      <div className="flex items-center gap-4 mt-8">
        {["Mistral", "vs", "Cohere"].map((label, i) => (
          <span
            key={i}
            className={
              label === "vs"
                ? "text-xs font-bold text-neon-cyan uppercase"
                : "px-3 py-1.5 rounded-lg bg-bg-card border border-border-card text-xs font-semibold text-text-secondary uppercase tracking-wider"
            }
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
