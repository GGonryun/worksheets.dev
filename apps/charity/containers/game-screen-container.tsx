import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { trpc } from '@worksheets/trpc-charity';
import { MixedGridItem } from '@worksheets/ui/game-grid';
import { GameDescription, GameScreen } from '@worksheets/ui/pages/game';
import {
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { AdsensePushScript } from '../scripts';

const DynamicGameLauncher = dynamic(() => import('./game-launcher-container'), {
  ssr: false,
});

const emptyAnalyticsPayload: GameAnalyticsSchema = {
  plays: '0',
  votes: { up: '0', down: '0' },
  score: '0',
};

const GameScreenContainer: React.FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  randomGame: string;
  gridItems: MixedGridItem[];
}> = ({ game, randomGame, developer, gridItems }) => {
  const { data: analytics } = trpc.game.analytics.useQuery({
    gameId: game.id,
  });

  return (
    <>
      <GameScreen
        game={
          <DynamicGameLauncher
            game={game}
            developer={developer}
            analytics={analytics ?? emptyAnalyticsPayload}
          />
        }
        description={
          <GameDescription
            game={game}
            developer={developer}
            analytics={analytics ?? emptyAnalyticsPayload}
          />
        }
        suggestions={[
          {
            href: `/play/${randomGame}`,
            type: 'button',
            text: {
              content: 'Random Game',
              color: 'text.primary',
              variant: 'h4',
            },
            backgroundColor: 'highlight.main',

            width: { xs: '1/-1' },
            Icon: ShuffleIcon,
          },
          ...gridItems,
          {
            type: 'button',
            text: {
              content: 'More Games',
              color: 'error.contrastText',
              variant: 'h4',
            },
            backgroundColor: 'error.main',
            href: '/play',
            Icon: SportsEsportsOutlinedIcon,
            width: { xs: '1/-1', sm: `span 3` },
          },
          {
            type: 'button',
            text: {
              content: 'All Tags',
              color: 'primary.contrastText',
              variant: 'h4',
            },
            backgroundColor: 'primary.main',
            href: '/tags',
            Icon: LocalOfferOutlinedIcon,
            width: { xs: '1/-1', sm: `span 3` },
          },
        ]}
      />
      <AdsensePushScript />
    </>
  );
};

export default GameScreenContainer;
