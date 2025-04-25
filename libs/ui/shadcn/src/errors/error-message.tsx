import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { cn } from '../utils';

export const ErrorMessage: React.FC<{
  title?: string | null;
  message?: string | null;
  className?: string;
}> = ({
  title = 'An error occurred',
  message = "We're sorry, something went wrong.",
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center space-y-4',
        className
      )}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'loop',
        }}
      >
        <AlertCircle className="w-16 h-16 text-red-500" />
      </motion.div>

      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

      {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  );
};
