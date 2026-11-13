import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export function ErrorState({ message, retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 px-6 text-center max-w-md mx-auto">
      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div>
        <h4 className="text-[var(--text-primary)] font-bold text-lg mb-1.5 font-mono">System Notice</h4>
        <p className="text-[var(--text-muted)] text-sm font-light leading-relaxed">
          {message ?? 'Unable to synchronize portfolio data from Google Sheets.'}
        </p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="px-6 py-2.5 rounded-xl neon-glow-btn text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}
