import { ArrowRight } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { ShuffleIcon } from '@worksheets/icons/native';
import { Categories } from '@worksheets/ui/components/categories';
import { GamesGroup } from '@worksheets/ui/components/games';
import { Markdown } from '@worksheets/ui-core';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';
import { FC } from 'react';

export type CategoryScreenProps = {
  name: string;
  games: BasicGameInfo[];
  relatedCategories: BasicCategoryInfo[];
  description: string;
};

export const CategoryScreen: FC<CategoryScreenProps> = ({
  name,
  games,
  relatedCategories,
  description,
}) => {
  return (
    <Box my={4}>
      <Categories
        sx={{
          px: 2,
          pb: 4,
          gap: 2,
        }}
        categories={relatedCategories.map((c) => ({
          id: c.id,
          text: c.name,
          imageSrc: c.image,
          color: 'warning',
        }))}
      />

      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: { xs: 2, sm: 4 },
            gap: 2,
            backgroundColor: (theme) => theme.palette.background['solid-blue'],
            background: (theme) => theme.palette.background['gradient-blue'],
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="center"
            gap={2}
            pb={2}
          >
            <Typography
              color="text.arcade"
              sx={{
                typography: { xs: 'h4', sm: 'h3' },
              }}
            >
              {name}
            </Typography>
            <Button
              variant="arcade"
              color="success"
              endIcon={<ArrowRight />}
              href={'/tags'}
              sx={{
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              All Categories
            </Button>
          </Box>
          <GamesGroup
            games={games.map((g) => ({
              id: g.id,
              name: g.name,
              caption: '',
              imageUrl: g.image,
            }))}
          />
        </Paper>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: { xs: 2, sm: 4 },
            backgroundColor: (theme) => theme.palette.background['solid-blue'],
            background: (theme) => theme.palette.background['gradient-blue'],
          }}
        >
          <Markdown
            text={description}
            sx={{
              color: (theme) => theme.palette.text.arcade,
            }}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={1}
            mt={4}
          >
            <Button
              variant="arcade"
              color="error"
              endIcon={<ArrowRight />}
              href={'/play'}
            >
              All Games
            </Button>
            <Button
              variant="arcade"
              color="warning"
              startIcon={<ShuffleIcon size={20} />}
              href={'/play/random'}
            >
              Random Game
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
