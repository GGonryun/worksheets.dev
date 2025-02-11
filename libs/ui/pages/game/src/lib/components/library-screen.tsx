'use client';

import { Box, Container } from '@mui/material';
import { Categories } from '@worksheets/ui/components/categories';
import { GamesGroup } from '@worksheets/ui/components/games';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';

export type LibraryScreenProps = {
  games: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};
export const LibraryScreen: React.FC<LibraryScreenProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 4 },
        my: { xs: 2, sm: 4 },
      }}
    >
      <Categories
        categories={props.categories.map((c) => ({
          color: 'warning',
          text: c.name,
          id: c.id,
          imageSrc: c.image,
        }))}
        sx={{
          px: '24px',
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
        }}
      >
        <GradientShadowedTypography
          typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}
          textTransform="uppercase"
          textShadow={'0 3px 21px #00315F'}
          background={(theme) =>
            theme.palette.text.marketing.gradients.orange.main
          }
        >
          All Games
        </GradientShadowedTypography>
        <GamesGroup pageSize={100} games={props.games} />
      </Container>
    </Box>
  );
};
