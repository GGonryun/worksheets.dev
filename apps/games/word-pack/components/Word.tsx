import { SxProps, Button, Typography } from '@mui/material';
import { responsiveFontSize, textShadow } from '@worksheets/ui-games';
import { FC, ReactNode } from 'react';

export const Word: FC<{
  children: ReactNode;
  onClick: () => void;
  found?: boolean;
  active?: boolean;
}> = ({ children, found, active, onClick }) => {
  const backgroundColor = active ? `rgba(0, 0, 0, 0.20)` : undefined;
  const sx: SxProps = {
    py: 0.5,
    my: 0.5,
    borderRadius: 0,
    backgroundColor,
    '&:hover': {
      backgroundColor,
    },
    '&:active': {
      backgroundColor,
    },
    '&:focus': {
      backgroundColor,
    },
  };

  return (
    <Button
      disableRipple
      disableFocusRipple
      disableTouchRipple
      onClick={onClick}
      sx={sx}
    >
      <Typography
        color={(theme) => theme.palette.primary.contrastText}
        fontSize={responsiveFontSize({ min: 14, grow: 3 })}
        fontWeight={900}
        sx={{
          opacity: found ? 0.4 : 1,
          textShadow: textShadow(2, 1),
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};
