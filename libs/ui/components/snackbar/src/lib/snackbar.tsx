import Alert, { AlertProps } from '@mui/material/Alert';
import MuiSnackbar, {
  SnackbarProps as MuiSnackbarProps,
} from '@mui/material/Snackbar';

export type SnackbarSeverity = AlertProps['severity'];

type SnackbarProps = Pick<MuiSnackbarProps, 'open' | 'onClose'> & {
  message?: React.ReactNode;
  severity: SnackbarSeverity;
  duration?: number;
};

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  onClose,
  message,
  severity,
}) => {
  return (
    <MuiSnackbar open={open} onClose={onClose}>
      <Alert
        onClose={(e) => onClose && onClose(e, 'escapeKeyDown')}
        severity={severity}
        variant="filled"
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
