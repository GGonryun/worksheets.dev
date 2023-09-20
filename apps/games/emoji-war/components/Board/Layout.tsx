import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

// Creates a square that is responsive to the general viewport size
//https://stackoverflow.com/questions/6148012/setting-element-width-based-on-height-via-css
export const Layout: FC<{
  children: ReactNode;
  size: `${number}vh`;
  maxSize: `${number}px`;
}> = ({ children, size, maxSize }) => (
  <Box>
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        height: size,
        maxHeight: maxSize,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          height: '100%',
        }}
      ></svg>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  </Box>
);
