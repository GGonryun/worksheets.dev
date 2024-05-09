import { trpc } from '@worksheets/trpc-charity';
import { hoursFromNow } from '@worksheets/util/time';

import { RafflesSection } from '../components/raffles-section';

export const RafflesSectionContainer = () => {
  const latest = trpc.public.raffles.soonest.expiration.useQuery();
  return (
    <RafflesSection
      raffleExpiration={latest.data ?? hoursFromNow(36).getTime()}
    />
  );
};
