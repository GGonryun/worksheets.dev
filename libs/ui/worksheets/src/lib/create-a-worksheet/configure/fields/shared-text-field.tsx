import styles from './styles.module.scss';
import { TextField, TextFieldProps } from '@mui/material';

export const SharedTextField: React.FC<
  Omit<TextFieldProps, 'fullWidth' | 'size' | 'InputLabelProps'>
> = (props) => {
  return (
    <TextField
      fullWidth
      size="small"
      InputLabelProps={{
        shrink: true,
        sx(theme) {
          return {
            color: theme.palette.text.primary,
            fontWeight: 'bold',
          };
        },
        classes: { asterisk: styles['asterisk'] },
      }}
      {...props}
    />
  );
};
