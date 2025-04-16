'use client';

import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../ui/sheet';
import type { Dispatch, SetStateAction } from 'react';
import { CheckCircle } from 'lucide-react';
import {
  privacyStatement,
  submissionGuidelines,
  tosStatement,
} from '@worksheets/util/legal';
import { LegalHtml } from './legal';

type TermsAccepted = {
  termsOfService: boolean;
  privacyPolicy: boolean;
  submissionPolicies: boolean;
};

interface TermsStepProps {
  termsAccepted: TermsAccepted;
  setTermsAccepted: Dispatch<SetStateAction<TermsAccepted>>;
}

type PolicyType = 'termsOfService' | 'privacyPolicy' | 'submissionPolicies';

const policyContent = {
  termsOfService: {
    title: 'Terms of Service Agreement',
    content: tosStatement,
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    content: privacyStatement,
  },
  submissionPolicies: {
    title: 'Game Submission Policies',
    content: submissionGuidelines,
  },
};

export default function TermsStep({
  termsAccepted,
  setTermsAccepted,
}: TermsStepProps) {
  const [openPolicy, setOpenPolicy] = useState<PolicyType | null>(null);

  const handleOpenPolicy = (policy: PolicyType) => {
    setOpenPolicy(policy);
  };

  const handleAcceptPolicy = () => {
    if (openPolicy) {
      setTermsAccepted((prev) => ({
        ...prev,
        [openPolicy]: true,
      }));
      setOpenPolicy(null);
    }
  };

  const handleSheetClose = () => {
    setOpenPolicy(null);
  };

  const getPolicyTitle = (policy: PolicyType): string => {
    switch (policy) {
      case 'termsOfService':
        return 'Terms of Service Agreement';
      case 'privacyPolicy':
        return 'Privacy Policy';
      case 'submissionPolicies':
        return 'Game Submission Policies';
    }
  };

  const getPolicyDescription = (policy: PolicyType): string => {
    switch (policy) {
      case 'termsOfService':
        return 'I have read and agree to the Terms of Service that govern my use of the platform.';
      case 'privacyPolicy':
        return 'I understand how my data will be used as described in the Privacy Policy.';
      case 'submissionPolicies':
        return 'I agree to follow the guidelines for submitting games to the platform.';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Terms & Policies</h2>
        <p className="text-muted-foreground mt-2">
          Please review and accept our terms and policies to continue
        </p>
      </div>

      <div className="space-y-4">
        {(
          [
            'termsOfService',
            'privacyPolicy',
            'submissionPolicies',
          ] as PolicyType[]
        ).map((policy) => (
          <div
            key={policy}
            className={`flex items-start space-x-3 p-4 border rounded-md cursor-pointer transition-colors ${
              termsAccepted[policy]
                ? 'border-green-500 bg-green-50'
                : 'hover:bg-muted'
            }`}
            onClick={() => handleOpenPolicy(policy)}
          >
            <Checkbox
              id={policy}
              checked={termsAccepted[policy]}
              className="mt-1"
              // Prevent checkbox from handling click separately
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPolicy(policy);
              }}
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={policy}
                  className="font-medium text-base cursor-pointer"
                >
                  {getPolicyTitle(policy)}
                </Label>
                {termsAccepted[policy] && (
                  <Badge className="bg-green-500 hover:bg-green-600 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {getPolicyDescription(policy)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Sheet open={openPolicy !== null} onOpenChange={handleSheetClose}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto flex flex-col">
          <SheetHeader>
            <SheetTitle>{openPolicy && getPolicyTitle(openPolicy)}</SheetTitle>
            <SheetDescription>
              Please read the following carefully before accepting
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto ">
            {openPolicy && (
              <LegalHtml>{policyContent[openPolicy].content}</LegalHtml>
            )}
          </div>

          <SheetFooter className="mt-auto pt-4 border-t sticky bottom-0 bg-background">
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={handleSheetClose}>
                Cancel
              </Button>
              <Button onClick={handleAcceptPolicy}>I Accept</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
