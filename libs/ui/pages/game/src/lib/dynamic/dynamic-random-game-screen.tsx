import { trpc } from '@worksheets/trpc-charity';
import { useDeviceChecks } from '@worksheets/ui/hooks/use-device-checks';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RandomGameScreen = () => {
  const { isMobileOrTablet } = useDeviceChecks();
  const { recentlyPlayed } = useRecentlyPlayedGames();

  const { data, isLoading, error } = trpc.game.findRandom.useQuery({
    isMobileOrTablet,
    recentlyPlayed: recentlyPlayed.map((g) => g.id),
  });
  const { push } = useRouter();

  useEffect(() => {
    if (data && !isLoading && !error) {
      push(`/play/${data.id}`);
    } else if (error) {
      push('/');
    }
  }, [data, error, isLoading, push]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen />}
    </>
  );
};

export const DynamicRandomGameScreen = dynamic(
  () => Promise.resolve(RandomGameScreen),
  {
    ssr: false,
  }
);