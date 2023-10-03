import { useLocalStorage } from '@worksheets/ui-core';
import { useEffect, useState } from 'react';
import { usePlayer } from './usePlayer';
import { APP_VERSION, UPDATE_BONUS } from '../constants';

export const useVersion = () => {
  const player = usePlayer();
  const [version, setVersion] = useLocalStorage<number>('version', 0);
  const [requiresUpdate, setRequiresUpdate] = useState<boolean>(false);
  const [ignored, setIgnored] = useState<boolean>(false);

  useEffect(() => {
    if (ignored) {
      return;
    }
    // check if the stored version is less than the current version
    if (!requiresUpdate && version < APP_VERSION) {
      // set the new version
      setRequiresUpdate(requiresUpdate);
    }
  }, [version]);

  return {
    requiresUpdate: !ignored && version < APP_VERSION,
    update: () => {
      player.loadPuzzle(player.level);
      player.addPoints(UPDATE_BONUS);
      return setVersion(APP_VERSION);
    },
    ignore: () => setIgnored(true),
  };
};
