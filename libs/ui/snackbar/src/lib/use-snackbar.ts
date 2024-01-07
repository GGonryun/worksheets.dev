import { useState } from 'react';

export type UseSnackbarHook = {
  open: boolean;
  trigger: () => void;
  terminate: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};

export const useSnackbar = (): UseSnackbarHook => {
  const [open, setOpen] = useState(false);

  return {
    open,
    trigger: () => {
      setOpen(true);
    },
    terminate: (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    },
  };
};
