import { routes } from '@worksheets/routes';
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

  const { data, isPending, error } = trpc.maybe.games.random.useQuery({
    isMobileOrTablet,
    recentlyPlayed: recentlyPlayed.map((g) => g.id),
  });
  const { push } = useRouter();

  useEffect(() => {
    if (data && !isPending && !error) {
      push(
        routes.game.path({
          params: {
            gameId: data.id,
          },
        })
      );
    } else if (error) {
      push(routes.play.path());
    }
  }, [data, error, isPending, push]);

  return (
    <>
      {isPending && <LoadingScreen />}
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
