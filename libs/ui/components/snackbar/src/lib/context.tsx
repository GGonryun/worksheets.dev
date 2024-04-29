import { waitFor } from '@worksheets/util/time';
import { createContext, ReactNode, useContext, useState } from 'react';

import { Snackbar, SnackbarSeverity } from './snackbar';

type SnackbarTriggerOptions = {
  message?: React.ReactNode;
  severity?: SnackbarSeverity;
};

export type SnackbarContextType = {
  /**
   * Triggers the snackbar
   * @param message A message to display (or empty for default)
   * @param severity A severity level (default: 'info')
   */
  trigger: (opt?: SnackbarTriggerOptions) => void;
  error: (message: React.ReactNode) => void;
  success: (message: React.ReactNode) => void;
  warning: (message: React.ReactNode) => void;
  info: (message: React.ReactNode) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  trigger: () => {
    return;
  },
  error: () => {
    return;
  },
  success: () => {
    return;
  },
  warning: () => {
    return;
  },
  info: () => {
    return;
  },
});

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === null) {
    throw new Error(
      'useSnackbarContext must be used within a SnackbarContextProvider'
    );
  }
  return context;
};

const DEFAULT_MESSAGE = '';
const DEFAULT_SEVERITY: SnackbarSeverity = 'info';
const CLOSE_DELAY = 150;
const DEFAULT_TIMEOUT = 5000;

export const SnackbarContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [timeout, saveTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<React.ReactNode>('');
  const [severity, setSeverity] = useState<SnackbarSeverity>(DEFAULT_SEVERITY);

  const onOpen = () => {
    setOpen(true);
    if (timeout) {
      clearTimeout(timeout);
    }
    saveTimeout(
      setTimeout(() => {
        setOpen(false);
      }, DEFAULT_TIMEOUT)
    );
  };
  const onClose = async (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    clearTimeout(timeout);
    setOpen(false);
    // wait for the snackbar to close before resetting the message
    await waitFor(CLOSE_DELAY);
    setMessage(DEFAULT_MESSAGE);
    setSeverity(DEFAULT_SEVERITY);
  };

  const trigger = (opt?: SnackbarTriggerOptions) => {
    onOpen();
    setSeverity(opt?.severity ?? DEFAULT_SEVERITY);
    setMessage(opt?.message ?? DEFAULT_MESSAGE);
  };

  const error = (message: React.ReactNode) => {
    trigger({ message, severity: 'error' });
  };
  const success = (message: React.ReactNode) => {
    trigger({ message, severity: 'success' });
  };
  const warning = (message: React.ReactNode) => {
    trigger({ message, severity: 'warning' });
  };
  const info = (message: React.ReactNode) => {
    trigger({ message, severity: 'info' });
  };

  return (
    <SnackbarContext.Provider
      value={{
        trigger,
        error,
        success,
        warning,
        info,
      }}
    >
      {children}
      <Snackbar
        open={open}
        message={message}
        severity={severity}
        onClose={onClose}
      />
    </SnackbarContext.Provider>
  );
};
