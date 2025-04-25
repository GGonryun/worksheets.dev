'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { CheckCircle, Square, SquareCheckBig } from 'lucide-react';
import {
  privacyStatement,
  submissionGuidelines,
  tosStatement,
} from '@worksheets/util/legal';
import { LegalHtml } from './legal';
import { ActionsLayout } from './actions-layout';
import { useFormContext } from 'react-hook-form';
import { CreateTeamSchema } from '@worksheets/util/types';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

type TermsAccepted = {
  termsOfService: boolean;
  privacyPolicy: boolean;
  submissionPolicies: boolean;
};

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

export const TermsStep: React.FC<{
  onNext: () => void;
}> = ({ onNext }) => {
  const form = useFormContext<CreateTeamSchema>();

  const [openPolicy, setOpenPolicy] = useState<PolicyType | null>(null);

  const termsOfService = form.watch('termsOfService');
  const privacyPolicy = form.watch('privacyPolicy');
  const submissionPolicies = form.watch('submissionPolicies');

  const termsAccepted: TermsAccepted = useMemo(
    () => ({
      termsOfService,
      privacyPolicy,
      submissionPolicies,
    }),
    [termsOfService, privacyPolicy, submissionPolicies]
  );

  const handleOpenPolicy = (policy: PolicyType) => {
    setOpenPolicy(policy);
  };

  const handleAcceptPolicy = () => {
    if (openPolicy) {
      form.setValue(openPolicy, true);
      form.trigger(openPolicy);
      setOpenPolicy(null);
    }
  };

  const handleSheetClose = () => {
    setOpenPolicy(null);
  };

  const handleNext = async () => {
    const validate = await form.trigger([
      'termsOfService',
      'privacyPolicy',
      'submissionPolicies',
    ]);
    if (validate) {
      onNext();
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
          <FormField
            key={policy}
            control={form.control}
            name={policy}
            render={() => (
              <FormItem>
                <div
                  className={`flex items-start space-x-3 p-4 border rounded-md cursor-pointer transition-colors ${
                    termsAccepted[policy]
                      ? 'border-green-500 bg-green-50'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleOpenPolicy(policy)}
                >
                  {termsAccepted[policy] ? <SquareCheckBig /> : <Square />}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <FormLabel>{getPolicyTitle(policy)}</FormLabel>

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
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <ActionsLayout>
          <div />
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        </ActionsLayout>
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
};
