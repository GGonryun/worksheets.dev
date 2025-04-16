import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

export const DynamicPreviewScreenContainer = dynamic(
  () => import('../containers/preview-screen-container'),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
