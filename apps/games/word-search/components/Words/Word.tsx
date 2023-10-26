import { Button, Typography, darken, lighten } from '@mui/material';
import { FC, ReactNode } from 'react';
import { colors } from '../../util';
import { responsiveFontSize } from '@worksheets/ui-games';

export const Word: FC<{
  children: ReactNode;
  onClick: () => void;
  found?: number;
  large?: boolean;
}> = ({ children, found, onClick, large }) => {
  return (
    <Button
      disableRipple
      onClick={onClick}
      sx={{
        py: 0.5,
        my: 0,
      }}
    >
      <Typography
        color={(theme) =>
          found ? lighten(colors[found], 0.5) : theme.palette.text.primary
        }
        fontSize={responsiveFontSize({
          min: 12,
          grow: large ? 4.0 : 3.5,
          max: large ? 48 : 28,
        })}
        fontWeight={900}
        sx={{
          textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
          textDecoration: found ? 'line-through' : 'none',
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};
