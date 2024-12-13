import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="w-full h-64 flex items-center justify-center" data-testid="error-state">
    <div className="flex flex-col items-center gap-4">
      <AlertTriangle className="w-12 h-12 text-red-500" />
      <p className="text-red-400">{error.message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);