import { trpc } from '@worksheets/trpc-charity';
import { GAME_TRACK_FREQUENCY_SECONDS } from '@worksheets/util/settings';
import React, { useEffect, useState } from 'react';

const GameTrackingContext = React.createContext<null>(null);

export const GameTrackingProvider: React.FC<{
  gameId: string;
  children: React.ReactNode;
}> = ({ children, gameId }) => {
  const trackGameTime = trpc.maybe.games.track.useMutation();
  const [windowIsActive, setWindowIsActive] = useState(true);

  function handleActivity(forcedFlag: unknown) {
    if (typeof forcedFlag === 'boolean') {
      return forcedFlag ? setWindowIsActive(true) : setWindowIsActive(false);
    }

    return document.hidden ? setWindowIsActive(false) : setWindowIsActive(true);
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleActivity);

    return () => {
      document.removeEventListener('visibilitychange', handleActivity);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!windowIsActive) return;

      trackGameTime.mutate({
        gameId,
        duration: GAME_TRACK_FREQUENCY_SECONDS,
      });
    }, GAME_TRACK_FREQUENCY_SECONDS * 1000);
    return () => clearInterval(interval);
  }, [gameId, trackGameTime, windowIsActive]);

  return (
    <GameTrackingContext.Provider value={null}>
      {children}
    </GameTrackingContext.Provider>
  );
};
