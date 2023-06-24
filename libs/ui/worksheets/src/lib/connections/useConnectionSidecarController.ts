import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useConnectionSidecarController = () => {
  const [activeConnection, setActiveConnection] = useState<string | undefined>(
    undefined
  );

  const closeEditor = () => {
    setActiveConnection(undefined);
  };

  const createConnection = () => {
    setActiveConnection(uuidv4());
  };

  const editConnection = (id: string) => {
    setActiveConnection(id);
  };

  return { activeConnection, closeEditor, createConnection, editConnection };
};
