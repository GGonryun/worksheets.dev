import { ButtonBase, styled } from '@mui/material';
import { selectBackground } from '@worksheets/ui/common';

export const BoxedApplicationButton = styled(ButtonBase)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    '#application-icon-box': {
      backgroundColor: selectBackground(theme, 'primary'),
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));
