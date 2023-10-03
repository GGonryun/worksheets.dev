import { useLocalStorage } from '@worksheets/ui-core';
import { useEffect, useState } from 'react';
import { APP_VERSION } from '../constants';

export const useVersion = () => {
  const [version, setVersion, loading] = useLocalStorage<number>('version', 0);
  const [requiresUpdate, setRequiresUpdate] = useState<boolean>(false);
  const [ignored, setIgnored] = useState<boolean>(false);

  useEffect(() => {
    if (ignored || loading) {
      return;
    }
    if (!version) {
      setVersion(APP_VERSION);
      return;
    }
    // check if the stored version is less than the current version
    if (!requiresUpdate && version < APP_VERSION) {
      // set the new version
      setRequiresUpdate(true);
    }
  }, [version, loading]);

  return {
    requiresUpdate: !ignored && requiresUpdate,
    update: () => {
      return setVersion(APP_VERSION);
    },
    ignore: () => setIgnored(true),
  };
};
