'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { AlertTriangle, ArrowLeft, RefreshCw, Mail } from 'lucide-react';
import { routes } from '@worksheets/routes';

interface ErrorStepProps {
  message?: string;
  onRetry: () => void;
  onGoBack: () => void;
}

export default function ErrorStep({
  message,
  onRetry,
  onGoBack,
}: ErrorStepProps) {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-600">Setup Failed</h2>

      <div className="space-y-2">
        <p className="text-muted-foreground">
          {message
            ? message
            : 'We encountered an unrecoverable error while setting up your team.'}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800 max-w-md mx-auto">
        <p>
          You can try submitting again or go back to review your information. If
          the problem persists, please contact our support team.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button
          onClick={onRetry}
          variant="default"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        <Button variant="outline" className="flex items-center gap-2" asChild>
          <Link href={routes.contact.url()}>
            <Mail className="h-4 w-4" />
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );
}
