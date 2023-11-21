import { Link, LinkProps, styled } from '@mui/material';
import { JSXElementConstructor, ReactNode } from 'react';

export type ReferencePillSkeletonProps = {
  children: ReactNode;
  href: string;
};

export const ReferencePillSkeleton = styled<JSXElementConstructor<LinkProps>>(
  (props) => <Link underline="none" {...props} />
)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  padding: '4px',
  boxShadow: theme.shadows[2],
  top: 0,
  transition: theme.transitions.create(['top', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    top: -2,
    boxShadow: theme.shadows[6],
  },
}));
