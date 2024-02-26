import { trpc } from '@worksheets/trpc-charity';
import { useDeviceChecks } from '@worksheets/ui/hooks/use-device-checks';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RandomGameScreen = () => {
  const { isMobileOrTablet } = useDeviceChecks();
  const { recentlyPlayed } = useRecentlyPlayedGames();

  const { data, isLoading, error } = trpc.public.games.findRandom.useQuery({
    isMobileOrTablet,
    recentlyPlayed: recentlyPlayed.map((g) => g.id),
  });
  const { push } = useRouter();

  useEffect(() => {
    if (data && !isLoading && !error) {
      push(
        routes.game.path({
          params: {
            gameId: data.id,
          },
        })
      );
    } else if (error) {
      push(routes.games.path());
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
