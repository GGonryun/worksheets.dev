import { useInterval } from '@worksheets/ui-core';
import {
  millisecondsToDuration,
  timeUntil as timeUntilUtil,
} from '@worksheets/util/time';
import { useState } from 'react';

export const useTimeUntil = (timestamp: number) => {
  const [timeUntil, setTimeUntil] = useState('??:??:??');

  useInterval(() => {
    setTimeUntil(millisecondsToDuration(Math.max(0, timeUntilUtil(timestamp))));
  }, 1000);

  return timeUntil;
};
