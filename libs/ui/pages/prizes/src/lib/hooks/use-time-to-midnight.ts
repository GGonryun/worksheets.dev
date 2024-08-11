import { useInterval } from '@worksheets/ui-core';
import {
  durationToString,
  millisecondsAsDuration,
  nextUtcMidnight,
  timeUntil,
} from '@worksheets/util/time';
import { useEffect, useState } from 'react';

export const useTimeToUtcMidnight = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const midnight = nextUtcMidnight();

  useEffect(() => {
    setTimeRemaining(timeUntil(midnight.getTime()));
  }, []);

  useInterval(() => {
    setTimeRemaining(timeUntil(midnight.getTime()));
  }, 1000);

  const string = durationToString(millisecondsAsDuration(timeRemaining));

  return { string, number: timeRemaining, utc: midnight };
};
