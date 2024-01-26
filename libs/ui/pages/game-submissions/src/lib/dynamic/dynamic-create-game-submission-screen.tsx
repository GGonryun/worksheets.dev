import dynamic from 'next/dynamic';

export const DynamicCreateGameSubmissionScreen = dynamic(
  () => import('../containers/create-game-submission-screen-container'),
  {
    ssr: false,
  }
);
