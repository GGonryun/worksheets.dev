import { Box, Typography } from '@mui/material';
import { denseBoxShadow, responsiveFontSize } from '@worksheets/ui-games';
import { FC, ReactNode } from 'react';

export const InnerBox: FC<{
  children?: ReactNode;
  size: number;
  active: boolean;
}> = ({ children, size, active }) => {
  return (
    <Box
      sx={{
        height: size,
        width: size,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '80%',
          width: '80%',
          borderRadius: '6px',
          boxShadow: denseBoxShadow(),
          backgroundColor: (theme) =>
            active
              ? theme.palette.success.light
              : theme.palette.background.paper,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Typography
          fontWeight={900}
          fontSize={responsiveFontSize({ min: 0, max: 32 })}
          lineHeight={'unset'}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
};
