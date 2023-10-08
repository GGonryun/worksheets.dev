import { useState, useEffect } from 'react';

export const useTemporaryModal = (delay: number) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [open, delay]);

  const onOpen = () => {
    setOpen(true);
  };

  return { open, onOpen };
};
