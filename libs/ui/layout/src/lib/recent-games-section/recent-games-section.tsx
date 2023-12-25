import { GameIcon } from '@worksheets/ui/game-grid';
import { GameIcon as GameIconType } from '@worksheets/util/types';
import { FC } from 'react';
import { NoRecentGamesPlaceholder } from './no-recent-games-placeholder';
import { Box } from '@mui/material';
import { GameSection } from '../drawer/game-section';

export const RecentGamesSection: FC<{ recent: GameIconType[] }> = ({
  recent,
}) => (
  <Box mt={3}>
    <GameSection title="Recently Played">
      {!recent.length && <NoRecentGamesPlaceholder />}
      {recent.map((game) => (
        <GameIcon key={game.id} size={94} {...game} />
      ))}
    </GameSection>
  </Box>
);
