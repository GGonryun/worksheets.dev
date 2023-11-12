import {
  Box,
  InputBase,
  InputBaseProps,
  InputLabel,
  InputLabelProps,
  TextareaAutosize,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!ROOT_DOMAIN) throw new Error('Missing NEXT_PUBLIC_ROOT_DOMAIN env var');

export const DenseInputLabel = styled<JSXElementConstructor<InputLabelProps>>(
  InputLabel
)(({ theme }) => ({
  fontFamily: theme.typography.secondary.fontFamily,
  fontWeight: 600,
  color: theme.palette.grey[800],
  fontSize: '0.8rem',
  '@media (max-width: 600px)': {
    fontSize: '0.75rem',
  },
}));

export const InputErrorText = styled<
  JSXElementConstructor<Omit<TypographyProps, 'children'> & { error?: string }>
>(({ error, ...props }) => <Typography {...props}>{error}</Typography>)(
  ({ theme, error }) => ({
    fontFamily: theme.typography.secondary.fontFamily,
    fontWeight: 400,
    fontSize: '0.75rem',
    color: theme.palette.error.main,
    padding: theme.spacing(0.5, 0, 0, 0),
    display: error ? 'block' : 'none',
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
    },
  })
);

export const SubdomainTextField: FC<InputBaseProps> = (props) => {
  return (
    <Box display="flex" alignItems={'center'}>
      <DefaultInputBase
        {...props}
        placeholder="subdomain"
        sx={{
          ...props.sx,
          '& .MuiInputBase-input': {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
      />
      <Box
        sx={{
          padding: (theme) => theme.spacing(0.5, 1),
          border: (theme) => `1px solid ${theme.palette.grey[500]}`,
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          borderLeft: 'none',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <DenseInputLabel
          htmlFor="team-subdomain"
          sx={{
            color: 'black',
          }}
        >
          .{ROOT_DOMAIN}
        </DenseInputLabel>
      </Box>
    </Box>
  );
};

export const DefaultInputBase = styled<JSXElementConstructor<InputBaseProps>>(
  InputBase
)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[500]}`,
    fontFamily: theme.typography.secondary.fontFamily,
    fontWeight: 500,
    padding: theme.spacing(0.5, 1),
    margin: 0,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
    '&:focus-visible': {
      outline: 0,
    },
    '@media(min-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
  },
}));

export const TextAreaAutoSize = styled(TextareaAutosize)(({ theme }) => ({
  fontFamily: theme.typography.secondary.fontFamily,
  fontWeight: 500,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[500]}`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
  '&:focus-visible': {
    outline: 0,
  },
  '@media(min-width: 600px)': {
    fontSize: '0.8rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.75rem',
  },
  '::placeholder': {
    color: theme.palette.grey[400],
  },
}));
