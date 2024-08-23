import { useInterval } from '@worksheets/ui-core';
import { PRIZE_WALL_INTERVAL } from '@worksheets/util/settings';
import {
  durationToString,
  getNextIntervalAligned,
  millisecondsAsDuration,
  printShortDateTime,
  timeUntil,
} from '@worksheets/util/time';
import { useEffect, useState } from 'react';

export const useNextPrizeWallInterval = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const next = getNextIntervalAligned(PRIZE_WALL_INTERVAL);
    setTimeRemaining(timeUntil(next.getTime()));
  }, []);

  useInterval(() => {
    const next = getNextIntervalAligned(PRIZE_WALL_INTERVAL);
    setTimeRemaining(timeUntil(next.getTime()));
  }, 1000);

  const string = durationToString(millisecondsAsDuration(timeRemaining));

  return {
    string,
    number: timeRemaining,
    utc: printShortDateTime(new Date(Date.now() + timeRemaining)),
  };
};
