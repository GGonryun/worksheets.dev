import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  styled,
} from '@mui/material';
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
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
          mt={4}
        >
          <StyledButton
            variant="contained"
            color="error"
            endIcon={<ArrowRight />}
            href={'/play'}
          >
            <Typography fontWeight={900}>All Games</Typography>
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            endIcon={<ArrowRight />}
            href={'/tags'}
          >
            <Typography fontWeight={900}>All Tags</Typography>
          </StyledButton>
        </Box>
      </Paper>
    </Container>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius * 6,
  padding: theme.spacing(0.5, 3),
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
    padding: theme.spacing(0.85, 4),
  },
}));

const sharedHeaderStyles = {
  marginTop: 0,
  fontSize: { xs: '1.5rem', sm: '2rem' },
  textAlign: 'center',
};
