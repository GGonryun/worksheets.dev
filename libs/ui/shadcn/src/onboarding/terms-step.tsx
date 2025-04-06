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
    content: `
      <h3 class="text-lg font-semibold mb-4">1. Acceptance of Terms</h3>
      <p class="mb-4">By accessing and using this platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      
      <h3 class="text-lg font-semibold mb-4">2. Use License</h3>
      <p class="mb-4">Permission is granted to temporarily download one copy of the materials on our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
      
      <h3 class="text-lg font-semibold mb-4">3. Disclaimer</h3>
      <p class="mb-4">The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      
      <h3 class="text-lg font-semibold mb-4">4. Limitations</h3>
      <p class="mb-4">In no event shall our platform or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
      
      <h3 class="text-lg font-semibold mb-4">5. Revisions and Errata</h3>
      <p class="mb-4">The materials appearing on our platform could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our platform are accurate, complete or current. We may make changes to the materials contained on our platform at any time without notice.</p>
    `,
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    content: `
      <h3 class="text-lg font-semibold mb-4">1. Information We Collect</h3>
      <p class="mb-4">We collect information you provide directly to us, such as when you create or modify your account, request customer service, or otherwise communicate with us. This information may include your name, email, phone number, postal address, and other contact or identifying information you choose to provide.</p>
      
      <h3 class="text-lg font-semibold mb-4">2. How We Use Information</h3>
      <p class="mb-4">We use the information we collect to provide, maintain, and improve our services, such as to administer your account, deliver the products and services you request, and customize your experience.</p>
      
      <h3 class="text-lg font-semibold mb-4">3. Information Sharing</h3>
      <p class="mb-4">We may share the information we collect with third parties who need to access it in order to do work on our behalf, including to help us operate, improve, and maintain our services.</p>
      
      <h3 class="text-lg font-semibold mb-4">4. Data Security</h3>
      <p class="mb-4">We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
      
      <h3 class="text-lg font-semibold mb-4">5. Your Choices</h3>
      <p class="mb-4">You may update, correct or delete information about you at any time by logging into your online account or emailing us. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.</p>
    `,
  },
  submissionPolicies: {
    title: 'Game Submission Policies',
    content: `
      <h3 class="text-lg font-semibold mb-4">1. Eligibility</h3>
      <p class="mb-4">All submitted games must be original works created by you or your team. You must have the legal right to submit the game and all its components (including artwork, music, and code).</p>
      
      <h3 class="text-lg font-semibold mb-4">2. Content Guidelines</h3>
      <p class="mb-4">Games must not contain offensive, discriminatory, or inappropriate content. We reserve the right to reject any submission that we deem to violate our community standards.</p>
      
      <h3 class="text-lg font-semibold mb-4">3. Technical Requirements</h3>
      <p class="mb-4">All games must be thoroughly tested and free of major bugs or technical issues. Games should include clear instructions for installation and gameplay.</p>
      
      <h3 class="text-lg font-semibold mb-4">4. Intellectual Property</h3>
      <p class="mb-4">You retain ownership of your game and all associated intellectual property. By submitting your game, you grant us a non-exclusive license to distribute, promote, and display your game on our platform.</p>
      
      <h3 class="text-lg font-semibold mb-4">5. Updates and Maintenance</h3>
      <p class="mb-4">You are responsible for maintaining your game and providing updates as necessary. We encourage regular updates to fix bugs and improve gameplay.</p>
    `,
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
          <SheetHeader className="mb-4">
            <SheetTitle>{openPolicy && getPolicyTitle(openPolicy)}</SheetTitle>
            <SheetDescription>
              Please read the following carefully before accepting
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto my-4">
            {openPolicy && (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: policyContent[openPolicy].content,
                }}
              />
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
