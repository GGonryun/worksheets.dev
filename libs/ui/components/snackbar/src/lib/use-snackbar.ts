import { waitFor } from '@worksheets/util/time';
import { useState } from 'react';

import { SnackbarProps } from './snackbar';

type SnackbarSeverity = SnackbarProps['severity'];

type SnackbarTriggerOptions = {
  message?: React.ReactNode;
  severity?: SnackbarSeverity;
};
export type UseSnackbarHook = {
  open: boolean;
  message: React.ReactNode;
  severity: SnackbarSeverity;
  /**
   * Triggers the snackbar
   * @param message A message to display (or empty for default)
   * @param severity A severity level (default: 'info')
   */
  trigger: (opt?: SnackbarTriggerOptions) => void;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};

const DEFAULT_MESSAGE = '';
const DEFAULT_SEVERITY: SnackbarSeverity = 'info';

export const useSnackbar = (): UseSnackbarHook => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<React.ReactNode>('');
  const [severity, setSeverity] = useState<SnackbarSeverity>(DEFAULT_SEVERITY);

  return {
    open,
    message: message,
    severity,
    trigger: (opt) => {
      setOpen(true);
      setSeverity(opt?.severity ?? DEFAULT_SEVERITY);
      setMessage(opt?.message ?? DEFAULT_MESSAGE);
    },
    onClose: async (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
      //wait for a bit before resetting the message
      await waitFor(100);
      setMessage(DEFAULT_MESSAGE);
      setSeverity(DEFAULT_SEVERITY);
    },
  };
};