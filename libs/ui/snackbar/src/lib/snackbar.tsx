import Alert, { AlertProps } from '@mui/material/Alert';
import MuiSnackbar, {
  SnackbarProps as MuiSnackbarProps,
} from '@mui/material/Snackbar';

export type SnackbarProps = Pick<MuiSnackbarProps, 'open' | 'onClose'> & {
  message: string;
  severity: AlertProps['severity'];
  duration?: number;
};

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  onClose,
  duration = 5000,
  message,
  severity,
}) => {
  return (
    <MuiSnackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <Alert
        onClose={(e) => onClose && onClose(e, 'escapeKeyDown')}
        severity={severity}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
