import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Markdown } from '../../typography';
import { MixedGrid } from '../../games';
import { MixedGridItem } from '../../games/mixed-grid-items';
import { ArrowUpRight } from '../../icons/arrow-up-right';

export type CategoryScreenProps = {
  text: string;
  games: MixedGridItem[];
  categories: MixedGridItem[];
  description: string;
  gamesHref: string | undefined;
};

export const CategoryScreen: FC<CategoryScreenProps> = ({
  gamesHref,
  text,
  games,
  categories,
  description,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box my={2}>
        <MixedGrid items={[{ text, type: 'text' }, ...games, ...categories]} />
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
          endIcon={<ArrowUpRight sx={{ ml: -0.5 }} />}
          href={gamesHref}
          sx={{
            mt: 2,
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