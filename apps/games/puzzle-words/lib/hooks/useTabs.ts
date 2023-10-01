import { useState } from 'react';

export const useTabs = (initial: number) => {
  const [tab, setTab] = useState(initial);

  const updateTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return {
    tab,
    updateTab,
  };
};
