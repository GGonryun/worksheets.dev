import { Button, styled } from '@mui/material';
import { growOnHoverMixin } from './mixins';

// TODO: this name is non-connotative. This is simply a name for a type of button that is used in the marketing page.
export const StandardProductButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  paddingLeft: 12,
  paddingRight: 12,
  boxSizing: 'border-box',
  '&:hover': {
    ...growOnHoverMixin(),
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const WhiteProductButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  boxSizing: 'border-box',
  paddingLeft: 12,
  paddingRight: 12,
  '&:hover': {
    ...growOnHoverMixin(),
    backgroundColor: theme.palette.background.paper,
  },
}));
