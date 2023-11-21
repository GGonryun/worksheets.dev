import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ResponsiveImage } from '../images';
import { ArrowUpRight } from '../icons/arrow-up-right';
import { ReferencePillSkeleton } from './reference-pill-skeleton';

export type CategoryPillProps = {
  name: string;
  imageUrl: string;
  href: string;
};

export const CategoryPill: FC<CategoryPillProps> = ({
  name,
  imageUrl,
  href,
}) => {
  return (
    <ReferencePillSkeleton href={href}>
      <Box
        sx={{
          height: { xs: 60, sm: 68 },
          width: { xs: 60, sm: 68 },
        }}
      >
        <ResponsiveImage priority alt={`${name} logo`} src={imageUrl} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
        px={1}
      >
        <Typography
          sx={{
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
          }}
        >
          {name}
        </Typography>
        <ArrowUpRight
          sx={{
            fontSize: '2rem',
            color: (theme) => theme.palette.primary.main,
          }}
        />
      </Box>
    </ReferencePillSkeleton>
  );
};
