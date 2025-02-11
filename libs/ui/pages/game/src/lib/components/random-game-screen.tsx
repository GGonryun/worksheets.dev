'use client';

import { playRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useDeviceChecks } from '@worksheets/ui/hooks/use-device-checks';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RandomGameScreen = () => {
  const { isMobileOrTablet } = useDeviceChecks();
  const { recentlyPlayed } = useRecentlyPlayedGames();

  const { data, isLoading, error } = trpc.maybe.games.random.useQuery({
    isMobileOrTablet,
    recentlyPlayed: recentlyPlayed.map((g) => g.id),
  });
  const { push } = useRouter();

  useEffect(() => {
    if (data && !isLoading && !error) {
      push(
        playRoutes.game.path({
          params: {
            gameId: data.id,
          },
        })
      );
    } else if (error) {
      console.warn('Error fetching random game', error);
      push(playRoutes.home.path());
    }
  }, [data, error, isLoading, push]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen />}
    </>
  );
};
