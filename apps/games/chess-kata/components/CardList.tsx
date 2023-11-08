import { PlayerColor } from '../util/board';
import { PLAYING_CARD_TYPES } from '../util/playing-cards';
import { PlayingCard } from './PlayingCard';
import { Box } from '@mui/material';

export const CardList = () => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {/* <GameBoard /> */}
      {PLAYING_CARD_TYPES.map((type) => (
        <PlayingCard
          key={type}
          size={120}
          type={type}
          player={PlayerColor.Red}
        />
      ))}
    </Box>
  </Box>
);
