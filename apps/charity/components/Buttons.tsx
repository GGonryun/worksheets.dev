import { Button, ButtonProps, styled } from '@mui/material';
import { tabletBoxShadow } from '@worksheets/ui-games';
import { JSXElementConstructor } from 'react';

export type StyledButton = JSXElementConstructor<ButtonProps>;

export const SubmissionButton = styled<StyledButton>((props) => (
  <Button variant="contained" color="primary" {...props} />
))(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.0rem',
  fontFamily: theme.typography.primary.fontFamily,
  boxShadow: tabletBoxShadow,
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:hover': {
    boxShadow: 'none',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.9rem',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const ConnectionButton = styled<StyledButton>((props) => (
  <Button size="small" variant="contained" color="secondary" {...props} />
))({
  position: 'absolute',
  right: 2,
  top: 2,
  fontSize: '0.85rem',
  '@media (max-width: 600px)': {
    fontSize: '0.65rem',
  },
});
