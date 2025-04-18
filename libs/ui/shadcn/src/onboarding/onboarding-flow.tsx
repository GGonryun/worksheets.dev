'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import TermsStep from './terms-step';
import TeamStep from './team-step';
import SocialLinksStep from './social-links-step';
import SuccessStep from './success-step';
import { TeamData, SocialLinks } from './types';
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
import ErrorStep from './error-step';
import { LoadingStep } from './loading-step';
import { TeamsQuery } from '../types';
import { useActiveTeam } from '../hooks/use-active-team';
import { waitFor } from '@worksheets/util/time';

export const OnboardingFlow = () => {
  const utils = trpc.useUtils();
  const teams = trpc.user.teams.list.useQuery();
  const prepareImage = trpc.user.teams.images.prepare.useMutation();
  const completeImage = trpc.user.teams.images.complete.useMutation();
  const createTeam = trpc.user.teams.create.useMutation();

  const [, setSavedTeam] = useActiveTeam();

  const [progress, setProgress] = useState(0);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [imageError, setImageError] = useState('');
  const [nameError, setNameError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState({
    termsOfService: false,
    privacyPolicy: false,
    submissionPolicies: false,
  });
  const [teamData, setTeamData] = useState<TeamData>({
    name: '',
    slug: '',
    image: null,
    imagePreview: '',
    description: '',
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    twitter: '',
    facebook: '',
    itchio: '',
    instagram: '',
    discord: '',
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

  const handleSubmit = async () => {
    setProgress(0);
    setCurrentStep(4);
    try {
      const team = await createTeam.mutateAsync({
        name: teamData.name,
        description: teamData.description,
        links: socialLinks,
      });
      setProgress(20);

      const file = teamData.image;

      if (file) {
        // Here you would typically send the data to your backend
        const prepareData = await prepareImage.mutateAsync({
          type: file.type,
          size: file.size,
          name: file.name,
          teamId: team.id,
        });
        setProgress(40);

        const result = await fetch(prepareData.uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });
        setProgress(60);

        if (!result.ok) {
          throw new Error(`File upload failed: ${result.statusText}`);
        }

        await completeImage.mutateAsync({
          fileId: prepareData.fileId,
        });
        setProgress(90);

        await waitFor(300);
        await utils.user.teams.list.invalidate();
        setSavedTeam(team.id);
        setProgress(100);
      }

      setCurrentStep(5);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setCurrentStep(-1);
      return;
    }
  };

  const allTermsAccepted = Object.values(termsAccepted).every(Boolean);
  const teamValid =
    teamData.name.trim() !== '' &&
    teamData.description.trim() !== '' &&
    nameError === '' &&
    teamData.image !== null &&
    imageError === '';

  return (
    <div className="w-full mx-auto">
      <ProgressIndicator currentStep={currentStep} onSetStep={goToStep} />

      {currentStep !== -1 && (
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

      <Card>
        <CardContent className="pt-6">
          {currentStep === -1 && (
            <ErrorStep
              message={errorMessage}
              onRetry={handleSubmit}
              onGoBack={() => goToStep(2)}
            />
          )}
          {currentStep === 1 && (
            <TermsStep
              termsAccepted={termsAccepted}
              setTermsAccepted={setTermsAccepted}
            />
          )}
          {currentStep === 2 && (
            <TeamStep
              teamData={teamData}
              setTeamData={setTeamData}
              imageError={imageError}
              setImageError={setImageError}
              nameError={nameError}
              setNameError={setNameError}
            />
          )}
          {currentStep === 3 && (
            <SocialLinksStep
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
          )}
          {currentStep === 4 && <LoadingStep progress={progress} />}
          {currentStep === 5 && <SuccessStep teamData={teamData} />}

          {currentStep > 0 && currentStep < 4 && (
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !allTermsAccepted) ||
                    (currentStep === 2 && !teamValid)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
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
  teams: TeamsQuery;
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
