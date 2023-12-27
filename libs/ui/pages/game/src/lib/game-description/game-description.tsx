import { Box, Chip, ChipProps, Typography } from '@mui/material';
import { FC } from 'react';
import { MarketWidgets } from './market-widgets';
import { MarkdownText, Markdown } from '@worksheets/ui-core';
import { GamePlayerSchema, GameSchema } from '@worksheets/util/types';
import { TopPlayers } from './top-players';
import { GameHeader } from './game-header';
import { GameActions } from './game-actions';

export type GameDescriptionProps = {
  title: string;
  text: MarkdownText;
  developer: {
    id: string;
    name: string;
  };
  created: string;
  updated: string;
  plays: string;
  score: string;
  // category breadcrumbs are rendered from left to right, least specific to most specific category.
  category: GameSchema['category'];
  tags: GameSchema['tags'];
  platforms: GameSchema['platforms'];
  markets?: GameSchema['markets'];
  topPlayers: GamePlayerSchema[];
};

export const GameDescription: FC<GameDescriptionProps> = ({
  text,
  tags,
  markets,
  topPlayers,
  ...headerProps
}) => {
  const handleShare = () => {
    alert('TODO: handle share');
  };

  const handleReport = () => {
    alert('TODO: handle report');
  };

  return (
    <Box display="flex" flexDirection="column" p={{ xs: 2, sm: 4 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <GameHeader {...headerProps} />
        <GameActions onReport={handleReport} onShare={handleShare} />
      </Box>
      <Box mt={2} mb={1} display="flex" flexDirection="column" gap={1}>
        <Typography variant="h4">About this game</Typography>
        <Markdown
          text={text}
          sx={{
            fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
          }}
        />
      </Box>
      <Box mt={1} mb={2} display="flex" flexWrap="wrap" gap={1}>
        {tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </Box>
      <TopPlayers players={topPlayers} />
      <MarketWidgets {...markets} />
      {/* TODO: add support for commenting */}
    </Box>
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
      color: theme.palette.grey[500],
      border: `2px solid ${theme.palette.grey[500]}`,
    })}
  />
);
