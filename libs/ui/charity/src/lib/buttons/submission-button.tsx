import { Button, ButtonProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';
import { tabletBoxShadow } from '../util/styles';

export const SubmissionButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => <Button variant="contained" color="primary" {...props} />
)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.0rem',
  fontFamily: theme.typography.primary.fontFamily,
  boxShadow: tabletBoxShadow,
  paddingBottom: theme.spacing(1),
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
