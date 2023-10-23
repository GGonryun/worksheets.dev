import { Box, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

export type CardPlaceholderProps = {
  left: number;
  top: number;
  height: number;
  width: number;
  Icon?: ReactNode;
  onClick?: () => void;
};

export const CardPlaceholder: FC<CardPlaceholderProps> = ({
  left,
  top,
  height,
  width,
  Icon,
  onClick,
}) => {
  const theme = useTheme();

  const borderColor = theme.palette.success.light;
  const backgroundColor = theme.palette.success.main;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        height,
        width,
        top,
        left,
        boxSizing: 'border-box',
        display: 'grid',
        placeItems: 'center',
        border: `3px solid ${borderColor}`,
        borderRadius: '8px',
        backgroundColor: Icon ? backgroundColor : undefined,
      }}
    >
      {Icon && Icon}
    </Box>
  );
};
