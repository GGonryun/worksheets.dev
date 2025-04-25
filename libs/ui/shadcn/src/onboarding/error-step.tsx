'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { AlertTriangle, ArrowLeft, Mail } from 'lucide-react';
import { routes } from '@worksheets/routes';
import { CreateTeamSchema } from '@worksheets/util/types';
import { useFormContext } from 'react-hook-form';
import { keysOf } from '@worksheets/util/objects';

interface ErrorStepProps {
  message?: string;
  onGoBack: () => void;
}

export const ErrorStep = ({ message, onGoBack }: ErrorStepProps) => {
  const form = useFormContext<CreateTeamSchema>();

  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-600">Setup Failed</h2>

      {message && (
        <div className="space-y-2">
          <p className="text-muted-foreground">{message}</p>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-left text-amber-800 max-w-md mx-auto">
        <p>
          Go back to the previous step and try again. If the problem persists,
          please check the following:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Check the form for any errors.</li>
          <li>Check your internet connection and try again.</li>
          <li>If you continue to experience issues, please contact support.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button className="flex items-center gap-2" onClick={onGoBack}>
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
};
