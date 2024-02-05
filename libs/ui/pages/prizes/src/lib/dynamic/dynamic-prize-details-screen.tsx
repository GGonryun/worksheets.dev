import { PrizeSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { PrizeDetailsScreen } from '../components';

const PrizeDetailsContainer: React.FC<{ prize: PrizeSchema }> = ({ prize }) => {
  return (
    <PrizeDetailsScreen
      suggestedPrizes={[]}
      prize={prize}
      allPrizes={[]}
      yourEntries={0}
      connected={false}
    />
  );
};

export const DynamicPrizeDetailsScreen = dynamic(
  () => Promise.resolve(PrizeDetailsContainer),
  {
    ssr: false,
  }
);
