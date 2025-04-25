'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ErrorMessage } from './error-message';

interface ErrorScreenProps {
  title?: string | null;
  message?: string | null;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  className?: string;
}

export const ErrorScreen = ({
  title,
  message,
  showHomeButton = true,
  showBackButton = true,
  className = '',
}: ErrorScreenProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goBack = () => {
    if (mounted) {
      window.history.back();
    }
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <div
      className={`flex items-center justify-center w-full h-full p-4 ${className}`}
    >
      <Card className="w-full max-w-md p-6 space-y-6">
        <ErrorMessage title={title} message={message} />

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && (
            <Button
              variant="outline"
              onClick={goBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          )}

          {showHomeButton && (
            <Button onClick={goHome} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
