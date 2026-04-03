export default function LoadingSkeleton() {
  return (
    <div className="max-w-2xl animate-fade-in">
      {/* Skeleton solution block */}
      <div className="mb-6">
        <div className="space-y-3 mb-4">
          <div className="h-3 w-full rounded-full animate-shimmer" />
          <div className="h-3 w-11/12 rounded-full animate-shimmer" />
          <div className="h-3 w-4/5 rounded-full animate-shimmer" />
        </div>

        {/* Fake code block */}
        <div className="bg-bg-code rounded-xl p-4 border border-border-subtle mb-4">
          <div className="space-y-2">
            <div className="h-2.5 w-3/4 rounded-full animate-shimmer" />
            <div className="h-2.5 w-1/2 rounded-full animate-shimmer" />
            <div className="h-2.5 w-5/6 rounded-full animate-shimmer" />
            <div className="h-2.5 w-2/3 rounded-full animate-shimmer" />
            <div className="h-2.5 w-4/5 rounded-full animate-shimmer" />
            <div className="h-2.5 w-1/3 rounded-full animate-shimmer" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-3 w-full rounded-full animate-shimmer" />
          <div className="h-3 w-3/4 rounded-full animate-shimmer" />
        </div>

        {/* Fake model footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-3 w-16 rounded-full animate-shimmer" />
          <div className="h-5 w-16 rounded-full animate-shimmer" />
        </div>
      </div>

      {/* Second skeleton */}
      <div className="mb-6">
        <div className="space-y-3 mb-4">
          <div className="h-3 w-full rounded-full animate-shimmer" />
          <div className="h-3 w-5/6 rounded-full animate-shimmer" />
          <div className="h-3 w-3/5 rounded-full animate-shimmer" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-3 w-14 rounded-full animate-shimmer" />
          <div className="h-5 w-16 rounded-full animate-shimmer" />
        </div>
      </div>

      {/* Loading pulse */}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" style={{ animationDelay: "0s" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" style={{ animationDelay: "0.3s" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" style={{ animationDelay: "0.6s" }} />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Models are generating solutions…
        </span>
      </div>
    </div>
  );
}
