import { useEffect, useState } from 'react';

export const usePanelController = <T>(bookmark: T) => {
  const [active, setActive] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (bookmark) {
      setActive(bookmark);
    }
  }, [bookmark]);

  const toggleActive = (panel: T | string) => {
    setActive((prev) => (prev === panel ? undefined : (panel as T)));
  };

  return { active, toggleActive };
};
