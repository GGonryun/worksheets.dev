import dynamic from 'next/dynamic';

export const DynamicGameSubmissionScreen = dynamic(
  () => import('../containers/game-submission-screen-container'),
  {
    ssr: false,
  }
);
