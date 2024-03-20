import { ArrowLeft } from '@mui/icons-material';
import { Box } from '@mui/material';
import common from '@worksheets/assets-common';
import Image from 'next/image';
import { FC } from 'react';

type GameExitFullscreenButtonProps = {
  onBack: () => void;
};
export const GameExitFullscreenButton: FC<GameExitFullscreenButtonProps> = ({
  onBack,
}) => (
  <Box
    id="game-exit-fullscreen-button"
    onClick={onBack}
    sx={{
      backgroundColor: (theme) => theme.palette.background.paper,
      display: 'flex',
      height: 48,
      width: 72,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'start',
      top: 18,
      left: -6,
      boxShadow: (theme) => theme.shadows[2],
      boxSizing: 'border-box',
      overflow: 'hidden',
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      zIndex: 1000005,
    }}
  >
    <ArrowLeft
      color="error"
      fontSize="large"
      sx={{
        mr: -1.5,
      }}
    />
    <Image
      src={common.charityGames.logos.square}
      alt="Charity Games Logo"
      width={40}
      height={40}
      priority={true}
    />
  </Box>
);
