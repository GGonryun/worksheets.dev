'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const IsClient = createContext(false);

export const IsClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return <IsClient.Provider value={isClient}>{children}</IsClient.Provider>;
};

export const useIsClient = () => {
  return useContext(IsClient);
};
