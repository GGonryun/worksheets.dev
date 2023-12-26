import { Button, ButtonProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const SocialProviderButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => <Button variant="outlined" color="black" {...props} />
)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius * 8,
  textTransform: 'none',
  fontFamily: theme.typography.mPlus1p.fontFamily,
  fontWeight: 600,
}));
