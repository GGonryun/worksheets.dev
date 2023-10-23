import { Star, Undo } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { FC } from 'react';

export type FooterProps = {
  onUndoClick: () => void;
  onNewGameClick: () => void;
};

export const Footer: FC<FooterProps> = ({ onUndoClick, onNewGameClick }) => {
  const buttonStyle = {
    height: '60px',
    width: '100%',
    color: 'primary.contrastText',
  };
  return (
    <Box position="absolute" bottom={0} left={0} right={0} display="flex">
      <Button sx={buttonStyle} onClick={onUndoClick} startIcon={<Undo />}>
        Undo
      </Button>
      <Button sx={buttonStyle} onClick={onNewGameClick} endIcon={<Star />}>
        New Game
      </Button>
    </Box>
  );
};
