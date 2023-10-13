import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

type OuterContentContainerProps = {
  children: ReactNode;
};

export const OuterContentContainer: FC<OuterContentContainerProps> = ({
  children,
}) => {
  return (
    <Box
      className="outer-content-container"
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
      }}
    >
      {children}
    </Box>
  );
};
