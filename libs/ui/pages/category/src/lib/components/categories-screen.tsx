import { PlayArrow } from '@mui/icons-material';
import { Button, Container, Paper, Typography } from '@mui/material';
import { Categories } from '@worksheets/ui/components/categories';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { routes } from '@worksheets/ui/routes';
import { BasicCategoryInfo } from '@worksheets/util/types';
import { FC } from 'react';

export type CategoriesScreenProps = {
  categories: BasicCategoryInfo[];
};

export const CategoriesScreen: FC<CategoriesScreenProps> = ({ categories }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 3, sm: 6 },
          padding: { xs: 2, sm: 3 },
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          background: (theme) => theme.palette.background['gradient-blue'],
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h3'} color="text.arcade">
          All Categories
        </Typography>
        <Categories
          hideAllCategoryAction
          sx={{
            flexWrap: 'wrap',
          }}
          categories={categories.map((c) => ({
            id: c.id,
            text: c.name,
            imageSrc: c.image,
            color: 'warning',
          }))}
        />
        <Button
          variant="arcade"
          size={isMobile ? 'medium' : 'large'}
          startIcon={<PlayArrow />}
          color="error"
          href={routes.library.path()}
        >
          All Games
        </Button>
      </Paper>
    </Container>
  );
};
