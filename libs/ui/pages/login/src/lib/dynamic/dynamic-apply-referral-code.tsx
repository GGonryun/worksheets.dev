import dynamic from 'next/dynamic';

export const DynamicApplyReferralCode = dynamic(
  () => import('../containers/apply-referral-code-container'),
  {
    ssr: false,
  }
);
