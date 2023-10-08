import { useState, useEffect } from 'react';

export const useTemporaryModal = (delay: number) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('useTemporaryModal', open);
    const timeout = setTimeout(() => {
      setOpen(false);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [open, delay]);

  const onOpen = () => {
    console.log('onOpen', true);
    setOpen(true);
  };

  return { open, onOpen };
};
