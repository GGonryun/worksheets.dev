'use client';

import { Button } from '../ui/button';

import { CheckCircle } from 'lucide-react';
import { TeamData } from './types';
import { useRouter } from 'next/router';
import { devRoutes } from '@worksheets/routes';

interface SuccessStepProps {
  teamData: TeamData;
}

export default function SuccessStep({ teamData }: SuccessStepProps) {
  const router = useRouter();
  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold">Setup Complete!</h2>

      <p className="text-muted-foreground">
        Congratulations! Your organization <strong>{teamData.name}</strong> has
        been successfully set up.
      </p>

      <div className="pt-4">
        <Button onClick={() => router.push(devRoutes.dashboard.path())}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
