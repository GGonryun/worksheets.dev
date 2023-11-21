import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ItemCarousel } from '../layout/drawer/item-carousel';

export type GameSectionProps = { title: string; children: ReactNode };
export const GameSection: FC<GameSectionProps> = ({ title, children }) => (
  <Box mb={2}>
    <Typography
      variant="h5"
      gutterBottom
      margin="16px 8px 0px"
      fontFamily={(theme) => theme.typography.dangrek.fontFamily}
      sx={{
        fontSize: { xs: '1.5rem', sm: '2rem' },
      }}
    >
      {title}
    </Typography>
    <ItemCarousel sx={{ gap: 2, px: 2 }}>{children}</ItemCarousel>
  </Box>
);
