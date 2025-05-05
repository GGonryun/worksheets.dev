import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

export const DynamicGameScreenContainer = dynamic(
  () => import('../containers/game-screen-container'),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

export const DynamicFallbackGameScreenContainer = dynamic(
  () => import('../containers/fallback-game-screen-container'),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
