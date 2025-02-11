import { RandomGameScreen } from '@worksheets/ui/pages/game';
import { Boundary } from '@worksheets/ui/suspense/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

export default async function Page() {
  return (
    <Boundary>
      <RandomGameScreen />
    </Boundary>
  );
}
