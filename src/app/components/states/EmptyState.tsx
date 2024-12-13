import { PackageX } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No offers available" 
}) => (
  <div className="w-full h-64 flex items-center justify-center" data-testid="empty-state">
    <div className="flex flex-col items-center gap-4">
      <PackageX className="w-12 h-12 text-gray-400" />
      <p className="text-gray-400">{message}</p>
    </div>
  </div>
);
