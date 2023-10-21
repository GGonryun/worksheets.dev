import { Box } from '@mui/material';
import { FC } from 'react';

export type FooterProps = {
  onUndoClick: () => void;
  onNewGameClick: () => void;
};

export const Footer: FC<FooterProps> = ({ onUndoClick, onNewGameClick }) => {
  return <Box></Box>;
};
