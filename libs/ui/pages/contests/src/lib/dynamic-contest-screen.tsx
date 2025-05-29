import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { ContestSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { CustomContainer } from './custom-container';

export const ContestScreen: React.FC<{
  contest: ContestSchema;
}> = ({ contest }) => <CustomContainer>TODO</CustomContainer>;

const ContestScreenContainer: React.FC<{
  contest: ContestSchema;
}> = ({ contest }) => {
  return <ContestScreen contest={contest} />;
};

export const DynamicContestScreen = dynamic(
  () => Promise.resolve(ContestScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
