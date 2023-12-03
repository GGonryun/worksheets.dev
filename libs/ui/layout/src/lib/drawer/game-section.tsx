import { FC, ReactNode } from 'react';
import { ArrowUpRight } from '@worksheets/ui/icons';
import { ItemCarousel } from './item-carousel';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export type GameSectionProps = {
  title: string;
  href?: string;
  children?: ReactNode;
};
export const GameSection: FC<GameSectionProps> = ({
  title,
  children,
  href,
}) => (
  <Box>
    <Link underline="hover" color="inherit" href={href}>
      <Typography
        variant="h4"
        sx={{
          marginLeft: 2,
          userSelect: 'none',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        {title}
        <ArrowUpRight sx={{ fontSize: 'inherit' }} />
      </Typography>
    </Link>
    <ItemCarousel sx={{ gap: 2, px: 2 }}>{children}</ItemCarousel>
  </Box>
);
