'use client';

import { Button } from '../ui/button';

import { CheckCircle } from 'lucide-react';
import { TeamData } from './types';

interface SuccessStepProps {
  teamData: TeamData;
}

export default function SuccessStep({ teamData }: SuccessStepProps) {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold">Setup Complete!</h2>

      <p className="text-muted-foreground">
        Congratulations! Your team <strong>{teamData.name}</strong> has been
        created. You can now start using the dashboard to manage your projects
        and collaborate with your team.
      </p>

      <div className="pt-4">
        <Button onClick={() => (window.location.href = '/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
