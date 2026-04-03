import { useEffect } from "react";

export default function SolutionModal({ isOpen, onClose, model, content }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Render content with code block support
  const renderContent = () => {
    const hasCode = /```[\s\S]*```/.test(content);
    if (!hasCode) {
      return (
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      );
    }

    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```\w*\n?/, "").replace(/```$/, "");
        return (
          <pre
            key={i}
            className="bg-bg-deep rounded-xl p-4 my-3 overflow-x-auto border border-border-subtle"
          >
            <code className="text-xs text-neon-cyan font-mono leading-relaxed">
              {code}
            </code>
          </pre>
        );
      }
      return (
        <p key={i} className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {part}
        </p>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[80vh] mx-4 bg-bg-card border border-border-card rounded-2xl shadow-2xl animate-fade-in-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-text-primary uppercase tracking-wider">
              {model}
            </span>
            <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-full">
              Full Solution
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
