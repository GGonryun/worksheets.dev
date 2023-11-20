import { Box, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

export const BannerBox: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      left: -6,
      top: 8,
      right: 0,
      padding: '0 8px 0 6px',
      pointerEvents: 'none',
      position: 'absolute',
    }}
  >
    <BannerBoxContent>{children}</BannerBoxContent>
  </Box>
);

const BannerBoxContent = styled(Box)(({ theme }) => ({
  height: 28,
  backgroundColor: '#fff',
  borderRadius: '3px 14px 14px 0',
  bottom: 0,
  boxShadow: '2px 2px 2px #0003',
  left: 0,
  padding: '2px 8px 0 5px',
  position: 'absolute',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '::before': {
    content: "''",
    left: 0,
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: '-4px',
    height: '4px',
    width: '4px',
    zIndex: 0,
  },
  '::after': {
    content: "''",
    left: 0,
    position: 'absolute',
    backgroundColor: theme.palette.grey[500],
    borderRadius: '4px 0 0 4px',
    bottom: '-8px',
    height: '8px',
    width: '6px',
    zIndex: 1,
  },
}));
