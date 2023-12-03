import { TextareaAutosize, styled } from '@mui/material';

export const TextAreaAutoSize = styled(TextareaAutosize)(({ theme }) => ({
  fontFamily: theme.typography.mPlus1p.fontFamily,
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
