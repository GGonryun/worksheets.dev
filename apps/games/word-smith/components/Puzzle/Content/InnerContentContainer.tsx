import { Box } from '@mui/material';
import { ReactNode, forwardRef } from 'react';

export type InnerContentContainerProps = {
  children: ReactNode;
};

export const InnerContentContainer = forwardRef<
  HTMLElement,
  InnerContentContainerProps
>(({ children }, ref) => (
  <Box
    ref={ref}
    className="inner-ontent-container"
    sx={{
      display: 'flex',
      height: '98%',
      width: '98%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      zIndex: 0,
    }}
  >
    {children}
  </Box>
));
InnerContentContainer.displayName = 'InnerContentContainer';
