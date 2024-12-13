import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => (
  <div className="w-full h-64 flex items-center justify-center" data-testid="loading-state">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      <p className="text-gray-400">Loading offers...</p>
    </div>
  </div>
);
