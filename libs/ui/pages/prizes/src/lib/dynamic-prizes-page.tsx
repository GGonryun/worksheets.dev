import dynamic from 'next/dynamic';

import { PrizesContainer } from './prizes-container';

export const DynamicPrizesPage = dynamic(
  () => Promise.resolve(PrizesContainer),
  {
    ssr: false,
  }
);
