import { Clear } from '@mui/icons-material';
import {
  TextField,
  InputAdornment,
  useTheme,
  IconButton,
  TextFieldProps,
} from '@mui/material';
import { FC } from 'react';

export const TinyTextField: FC<
  Pick<TextFieldProps, 'fullWidth' | 'value' | 'placeholder' | 'disabled'> & {
    onChange?: (value: string) => void;
    icon?: React.ReactNode;
  }
> = ({ icon, ...props }) => {
  const theme = useTheme();
  return (
    <TextField
      {...props}
      onChange={(e) => props.onChange?.(e.target.value)}
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '6px',
          py: 0.25,
          px: 1,
          m: 0,
          fontSize: 14,
          border: '1px solid transparent',
          borderTop: 'none',
          boxShadow:
            'inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF',
          '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
        '& .MuiInputBase-input': {
          py: 0,
          px: 0.5,
          m: 0,
        },
        '& .MuiInputAdornment-root': {
          pl: 0,
          m: 0,
        },
        '& .MuiSvgIcon-root': {
          height: 16,
          width: 16,
        },
        '& .Mui-disabled': {
          backgroundColor: theme.palette.grey[200],

          '&:hover fieldset': {
            borderColor: theme.palette.grey[500],
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.grey[500],
          },
        },
      }}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : null,
        endAdornment: !props.disabled ? (
          <InputAdornment position="end" sx={{ visibility: 'visible' }}>
            <IconButton
              size="small"
              sx={{ p: 0.1, m: 0 }}
              onClick={() => props.onChange?.('')}
            >
              <Clear />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};
