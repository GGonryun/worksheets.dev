import { Button, ButtonProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const ConnectionButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => (
    <Button size="small" variant="contained" color="secondary" {...props} />
  )
)({
  position: 'absolute',
  right: 2,
  top: 2,
  fontSize: '0.85rem',
  '@media (max-width: 600px)': {
    fontSize: '0.65rem',
  },
});
