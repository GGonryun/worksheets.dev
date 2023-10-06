import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useVersion = (currentVersion: number) => {
  const [version, setVersion, loading] = useLocalStorage<number>('version', 0);
  const [requiresUpdate, setRequiresUpdate] = useState<boolean>(false);
  const [ignored, setIgnored] = useState<boolean>(false);

  useEffect(() => {
    if (ignored || loading) {
      return;
    }
    if (!version) {
      setVersion(currentVersion);
      return;
    }
    // check if the stored version is less than the current version
    if (!requiresUpdate && version < currentVersion) {
      // set the new version
      setRequiresUpdate(true);
    }
  }, [version, loading]);

  return {
    requiresUpdate: !ignored && requiresUpdate,
    update: () => {
      return setVersion(currentVersion);
    },
    ignore: () => setIgnored(true),
  };
};
