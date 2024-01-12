import { Box, Chip, ChipProps, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { Markdown } from '@worksheets/ui-core';
import {
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { FC, useState } from 'react';

import { ReportIssueModal, ShareGameModal } from '../modals';
import { GameActions } from './game-actions';
import { GameHeader } from './game-header';
import { MarketWidgets } from './market-widgets';

export type GameDescriptionProps = {
  developer: DeveloperSchema;
  game: SerializableGameSchema;
  analytics: GameAnalyticsSchema;
};

export const GameDescription: FC<GameDescriptionProps> = ({
  game,
  developer,
  analytics,
}) => {
  const reportGame = trpc.game.report.useMutation();

  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleShare = () => {
    setShowShare(true);
  };

  const handleStartReport = () => {
    setShowReport(true);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" p={{ xs: 2, sm: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <GameHeader
            title={game.name}
            developer={developer}
            plays={analytics.plays}
            score={analytics.score}
            category={game.category}
            platforms={game.platforms}
          />
          <GameActions onReport={handleStartReport} onShare={handleShare} />
        </Box>
        <Box mt={2} mb={1} display="flex" flexDirection="column" gap={1}>
          <Typography variant="h4">About this game</Typography>
          <Markdown
            text={game.description}
            sx={{
              fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
            }}
          />
        </Box>
        <Box mt={1} mb={2} display="flex" flexWrap="wrap" gap={1}>
          {game.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </Box>
        <MarketWidgets {...game.markets} />
        {/* TODO: add support for commenting */}
      </Box>
      <ShareGameModal
        open={showShare}
        onClose={() => setShowShare(false)}
        game={game}
      />
      <ReportIssueModal
        open={showReport}
        onClose={() => setShowReport(false)}
        onReport={async (reason, text) => {
          await reportGame.mutateAsync({
            gameId: game.id,
            reason,
            text,
          });
        }}
      />
    </>
  );
};

// chips don't place nicely with styled components, so we have to use a separate component.
const TagChip: FC<ChipProps & { tag: string }> = ({ tag }) => (
  <Chip
    size="small"
    variant="outlined"
    label={tag}
    component="a"
    href={`/tags/${tag}`}
    clickable
    sx={(theme) => ({
      fontFamily: theme.typography.mPlus1p.fontFamily,
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.grey[600],
      border: `2px solid ${theme.palette.grey[600]}`,
    })}
  />
);
