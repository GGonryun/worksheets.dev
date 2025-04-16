import { Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';

export const LoadingStep: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
      </div>

      <h2 className="text-2xl font-bold">Creating your team</h2>

      <p className="text-muted-foreground">
        Please wait a few more seconds while we set up your organization...
      </p>

      <div className="w-full max-w-md mx-auto px-4">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2 text-right">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};
