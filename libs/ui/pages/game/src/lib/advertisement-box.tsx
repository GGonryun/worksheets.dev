import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

export const AdvertisementBox: FC<{ children: ReactNode }> = ({ children }) => {
  return <HorizontalAdvertisementBox>{children}</HorizontalAdvertisementBox>;
};

const HorizontalAdvertisementBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: '90px',
  width: '100%',

  [theme.breakpoints.up('xs')]: {
    gridRow: '6 / span 1',
    gridColumn: '1 / span 3',
  },
  [theme.breakpoints.up('mobile2')]: {
    gridRow: '4 / span 1',
    gridColumn: '2 / span 3',
  },
  [theme.breakpoints.up('sm')]: {
    gridRow: '5 / span 1',
    gridColumn: '2 / span 4',
  },
  [theme.breakpoints.up('desktop1')]: {
    gridRow: '6 / span 1',
    gridColumn: '2 / span 6',
  },
  [theme.breakpoints.up('md')]: {
    gridRow: '6 / span 1',
    gridColumn: '2 / span 6',
  },
  [theme.breakpoints.up('desktop2')]: {
    gridRow: '7 / span 1',
    gridColumn: '2 / span 8',
  },
  [theme.breakpoints.up('lg')]: {
    gridRow: '7 / span 1',
    gridColumn: '2 / span 8',
  },
  [theme.breakpoints.up('desktop3')]: {
    gridRow: '8 / span 1',
    gridColumn: '2 / span 10',
  },
  [theme.breakpoints.up('xl')]: {
    gridRow: '8 / span 1',
    gridColumn: '2 / span 10',
  },
}));
