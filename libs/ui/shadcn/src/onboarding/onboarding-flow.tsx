'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { TermsStep } from './terms-step';
import { TeamStep } from './team-step';
import { SocialLinksStep } from './social-links-step';
import { SuccessStep } from './success-step';
import { Progress } from '../ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { CheckIcon, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { devRoutes, routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorStep } from './error-step';
import { LoadingStep } from './loading-step';
import { UserTeamsListQuery } from '../types';
import { waitFor } from '@worksheets/util/time';
import { FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form';
import {
  createTeamDefaultValues,
  CreateTeamSchema,
  createTeamSchema,
} from '@worksheets/util/types';
import { zodResolver } from '@hookform/resolvers/zod';

export const OnboardingFlow = () => {
  const utils = trpc.useUtils();
  const teams = trpc.user.teams.list.useQuery();
  const createTeam = trpc.user.teams.create.useMutation();
  const selectTeam = trpc.user.teams.select.useMutation();

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<CreateTeamSchema>({
    resolver: zodResolver(createTeamSchema),
    mode: 'onChange',
    defaultValues: createTeamDefaultValues,
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  // TODO: remove the fake progress
  const onSubmit = async (data: CreateTeamSchema) => {
    console.log('submit data', data);
    setProgress(0);
    setCurrentStep(4);
    try {
      setProgress(20);
      const team = await createTeam.mutateAsync(data);

      setProgress(30);
      await waitFor(200);
      setProgress(40);

      setProgress(50);
      await utils.user.teams.list.invalidate();
      setProgress(60);
      await waitFor(200);
      setProgress(70);

      setProgress(80);
      await selectTeam.mutateAsync(team.id);
      setProgress(90);
      await waitFor(200);
      setProgress(100);
      await waitFor(300);

      setCurrentStep(5);
    } catch (error: any) {
      setError((error as Error).message);
      setCurrentStep(-1);
    }
  };

  const onInvalid: SubmitErrorHandler<CreateTeamSchema> = (errors) => {
    setError('Your submission has errors. Fix them and try again.');
    setCurrentStep(-1);
  };

  return (
    <div className="w-full mx-auto">
      <ProgressIndicator currentStep={currentStep} onSetStep={goToStep} />

      {currentStep === -1 && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExitDialogOpen(true)}
            aria-label="Exit onboarding"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-8"
        >
          <Card>
            <CardContent className="pt-6">
              {currentStep === -1 && (
                <ErrorStep
                  message={error}
                  onGoBack={() => {
                    setCurrentStep(1);
                  }}
                />
              )}
              {currentStep === 1 && <TermsStep onNext={nextStep} />}
              {currentStep === 2 && (
                <TeamStep onNext={nextStep} onPrev={prevStep} />
              )}
              {currentStep === 3 && <SocialLinksStep onPrev={prevStep} />}
              {currentStep === 4 && <LoadingStep progress={progress} />}
              {currentStep === 5 && <SuccessStep team={form.getValues()} />}
            </CardContent>
          </Card>
        </form>
      </FormProvider>

      <ExitConfirmationDialog
        exitDialogOpen={exitDialogOpen}
        setExitDialogOpen={setExitDialogOpen}
        teams={teams.data}
      />
    </div>
  );
};

const ProgressIndicator: React.FC<{
  currentStep: number;
  onSetStep: (s: number) => void;
}> = ({ onSetStep, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex flex-col items-center ${
              currentStep > step ? ' hover:cursor-pointer' : ''
            }`}
            onClick={() => {
              currentStep > step && onSetStep(step);
            }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted border-muted-foreground/20'
              }`}
            >
              {currentStep > step ? <CheckIcon /> : step}
            </div>
            <span
              className={`mt-2 text-sm ${
                currentStep === -1
                  ? 'text-red-500 font-medium'
                  : currentStep >= step
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {step === 1 ? 'Terms' : step === 2 ? 'Details' : 'Socials'}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <Progress
          indicatorColor={currentStep === -1 ? 'bg-red-500' : undefined}
          value={
            currentStep === -1
              ? 100
              : currentStep <= 1
              ? 10
              : currentStep === 2
              ? 50
              : currentStep === 3
              ? 90
              : 100
          }
        />
      </div>
    </div>
  );
};

const ExitConfirmationDialog: React.FC<{
  exitDialogOpen: boolean;
  setExitDialogOpen: (open: boolean) => void;
  teams: UserTeamsListQuery;
}> = ({ exitDialogOpen, setExitDialogOpen, teams }) => {
  const router = useRouter();
  return (
    <Dialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exit Onboarding?</DialogTitle>
          <DialogDescription>
            Are you sure you want to exit? Your progress will not be saved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:space-x-0">
          <Button variant="outline" onClick={() => setExitDialogOpen(false)}>
            Continue Setup
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              router.push(
                teams?.length ? devRoutes.dashboard.url() : routes.home.url()
              )
            }
          >
            {teams?.length ? 'Return to Dashboard' : 'Exit to Website'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
