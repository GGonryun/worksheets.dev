import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Markdown } from '@worksheets/ui-core';
import { ArrowRight } from '@mui/icons-material';
import { MixedGrid, MixedGridItem } from '@worksheets/ui/game-grid';

export type CategoryScreenProps = {
  text: string;
  games: MixedGridItem[];
  categories: MixedGridItem[];
  advertisements?: { slot: string; client: string; position: number }[];
  description: string;
};

export const CategoryScreen: FC<CategoryScreenProps> = ({
  text,
  games,
  categories,
  description,
  advertisements,
}) => {
  const items: MixedGridItem[] = [
    { text, type: 'text' },
    ...games,
    ...categories,
  ];

  // if we have an add ad it to the collection in the specified slot
  if (advertisements) {
    advertisements.forEach((ad) => {
      items.splice(ad.position, 0, {
        type: 'advertisement',
        slot: ad.slot,
        client: ad.client,
      });
    });
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
      }}
    >
      <Box py={2}>
        <MixedGrid items={items} />
      </Box>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Markdown
          text={description}
          sx={{
            '& h1': sharedHeaderStyles,
            '& h2': sharedHeaderStyles,
            fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
          }}
        />
        <Button
          variant="contained"
          color="error"
          endIcon={<ArrowRight sx={{ ml: -0.5 }} />}
          href={'/'}
          sx={{
            mt: 4,
            width: { xs: '100%', sm: 'fit-content' },
            borderRadius: 6,
            px: { xs: 3, sm: 4 },
            py: { xs: 0.5, sm: 0.85 },
          }}
        >
          <Typography fontWeight={900}>Explore All Games</Typography>
        </Button>
      </Paper>
    </Container>
  );
};

const sharedHeaderStyles = {
  marginTop: 0,
  fontSize: { xs: '1.5rem', sm: '2rem' },
  textAlign: 'center',
};
