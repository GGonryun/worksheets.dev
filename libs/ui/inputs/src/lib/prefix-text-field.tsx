import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FC, useRef } from 'react';

export const PrefixTextField: FC<
  Omit<TextFieldProps, 'ref' | 'sx' | 'InputProps' | 'inputProps'> & {
    prefix: string;
  }
> = ({ prefix, ...props }) => {
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <TextField
      {...props}
      ref={ref}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.grey[400],
          },
          '&:hover fieldset': {
            borderColor: theme.palette.grey[400],
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.grey[400],
            borderWidth: '1px',
          },
        },
      }}
      InputProps={{
        onClick: () => {
          if (ref.current) {
            ref.current.focus();
          }
        },
        sx: {
          backgroundColor: (theme) => theme.palette.grey[100],
          userSelect: 'none',
          cursor: 'default',
        },
        startAdornment: (
          <InputAdornment position="start" sx={{ marginRight: '2px' }}>
            {prefix}
          </InputAdornment>
        ),
      }}
      inputProps={{
        ref,
        sx: {
          backgroundColor: 'background.paper',
          paddingLeft: '2px',
          border: `1px solid ${theme.palette.grey[400]}`,
          borderRadius: 'inherit',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          '&:active, &:focus': {
            borderWidth: '2px',
            zIndex: 1,
            margin: '-1px',
            borderColor: theme.palette.primary.main,
          },
        },
      }}
    />
  );
};
