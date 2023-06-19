import * as React from 'react';

export type NotificationAlertProps = {
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const useSnackbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return { open, handleClick, handleClose };
};
