import {
  TextFieldProps,
  TextField,
  Theme,
  CSSObject,
  useTheme,
  Typography,
} from '@mui/material';
import { Error } from '@mui/icons-material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

const ErrorText: FC<{ error?: string }> = ({ error }) => {
  if (!error) return null;

  return (
    <Typography color="error" variant="caption">
      <Flex alignItems="center" gap={0.5}>
        <Error sx={{ mt: -0.5 }} fontSize="small" />
        {error}
      </Flex>
    </Typography>
  );
};

const styleMixin = (theme: Theme, error?: boolean): CSSObject => ({
  '& .MuiInputBase-input': {
    fontSize: theme.typography.h6.fontSize,
  },
  // error border
  border: error ? `2px solid ${theme.palette.error.main}` : undefined,
});

export const LargeTextField: FC<
  Pick<TextFieldProps, 'value' | 'onChange' | 'placeholder'> & {
    error?: string;
  }
> = ({ error, ...props }) => {
  const theme = useTheme();
  return (
    <Flex column gap={0.5}>
      <TextField
        {...props}
        variant="standard"
        fullWidth
        sx={styleMixin(theme, !!error)}
      />
      <ErrorText error={error} />
    </Flex>
  );
};
