import { Container, ContainerProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const CustomContainer = styled<JSXElementConstructor<ContainerProps>>(
  (props) => <Container maxWidth="xl" {...props} />
)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
