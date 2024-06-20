import { GAME_TRACK_FREQUENCY_SECONDS } from '@worksheets/util/settings';
import { S_TO_MS } from '@worksheets/util/time';
import { UserSchema } from '@worksheets/util/types';
import { useEffect, useRef, useState } from 'react';

export const useGameTracker = (
  user: UserSchema | undefined,
  opts: {
    onInterval?: (time: number) => void;
    onElapsed?: (time: number) => void;
  }
) => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef(false); // Flag to track if the timer has been started

  const start = () => {
    setIsActive(true);
    startedRef.current = true;
  };

  const end = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!user) return;

    let lastTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isActive) {
        end();
      } else if (
        document.visibilityState === 'visible' &&
        !isActive &&
        startedRef.current
      ) {
        start();
      }
    };

    const handleInterval = () => {
      const now = Date.now();
      const delta = now - lastTime;
      const severityFactor = 1.5;
      const adjustedMultiplier = Math.pow(user.multiplier, severityFactor);
      const duration =
        S_TO_MS(GAME_TRACK_FREQUENCY_SECONDS) / adjustedMultiplier;
      lastTime = now;

      setElapsedTime((prevElapsedTime) => prevElapsedTime + delta);

      opts.onInterval?.(elapsedTime);
      if (elapsedTime >= duration) {
        opts.onElapsed?.(elapsedTime);
        setElapsedTime(0);
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    if (isActive) {
      intervalRef.current = setInterval(handleInterval, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, elapsedTime, opts, user]);

  return { isActive, elapsedTime, start, end };
};
