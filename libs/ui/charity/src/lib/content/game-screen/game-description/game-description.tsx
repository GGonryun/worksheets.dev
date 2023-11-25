import {
  Box,
  Chip,
  ChipProps,
  Link,
  LinkProps,
  Typography,
  styled,
} from '@mui/material';
import { FC } from 'react';
import { Markdown, MarkdownText } from '../../../typography';
import { GameTags, MarketLinks, SupportedDevices } from '../../../util';
import { CategoryBreadcrumbs } from './category-breadcrumbs';
import { SupportedDeviceIcons } from './supported-device-icons';
import { MarketWidgets } from './market-widgets';

export type GameDescriptionProps = {
  title: string;
  text: MarkdownText;
  developer: {
    id: string;
    name: string;
  };
  created: string;
  updated: string;
  // category breadcrumbs are rendered from left to right, least specific to most specific category.
  category: GameTags[];
  tags: GameTags[];
  platforms: SupportedDevices[];
  markets?: Partial<MarketLinks>;
};

export const GameDescription: FC<GameDescriptionProps> = ({
  text,
  title,
  developer,
  category,
  tags,
  platforms,
  markets,
}) => {
  return (
    <Box display="flex" flexDirection="column" p={{ xs: 2, sm: 4 }}>
      <CategoryBreadcrumbs categories={category} />
      <Box mt={1} display="flex" gap={3} alignItems="center">
        <GameDescriptionTitle>{title}</GameDescriptionTitle>
        <SupportedDeviceIcons platforms={platforms} />
      </Box>
      <GameDeveloperLink href={`/d/${developer.id}`}>
        by {developer.name}
      </GameDeveloperLink>
      <Box mt={'28px'}>
        <Markdown
          text={text}
          sx={{
            fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
          }}
        />
      </Box>
      <Box py={1} display="flex" flexWrap="wrap" gap={1}>
        {tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </Box>
      {markets && <MarketWidgets {...markets} />}
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
    href={`/c/${tag}`}
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

const GameDescriptionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.dangrek.fontFamily,
  fontSize: theme.typography.pxToRem(30),
  lineHeight: 1,
  userSelect: 'none',
}));

const GameDeveloperLink = styled((props) => (
  <Link underline="hover" color="inherit" {...props} />
))<LinkProps>(({ theme }) => ({
  lineHeight: 1,
  color: theme.palette.grey[700],
  fontFamily: theme.typography.dangrek.fontFamily,
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightBold,
}));
