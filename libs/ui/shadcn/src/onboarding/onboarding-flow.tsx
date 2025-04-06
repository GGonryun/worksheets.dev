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

export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState({
    termsOfService: false,
    privacyPolicy: false,
    submissionPolicies: false,
  });
  const [teamData, setTeamData] = useState<TeamData>({
    name: '',
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

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', {
      termsAccepted,
      teamData,
      socialLinks,
    });
    nextStep();
  };

  const allTermsAccepted = Object.values(termsAccepted).every(Boolean);
  const teamValid =
    teamData.name.trim() !== '' && teamData.description.trim() !== '';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted border-muted-foreground/20'
                }`}
              >
                {currentStep > step ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep >= step
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {step === 1
                  ? 'Terms & Policies'
                  : step === 2
                  ? 'Team Details'
                  : 'Social Links'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <Progress
            value={
              currentStep <= 1
                ? 8
                : currentStep === 2
                ? 52.5
                : currentStep === 3
                ? 95
                : 100
            }
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <TermsStep
              termsAccepted={termsAccepted}
              setTermsAccepted={setTermsAccepted}
            />
          )}
          {currentStep === 2 && (
            <TeamStep teamData={teamData} setTeamData={setTeamData} />
          )}
          {currentStep === 3 && (
            <SocialLinksStep
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
          )}
          {currentStep === 4 && <SuccessStep teamData={teamData} />}

          {currentStep < 4 && (
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
    </div>
  );
};
