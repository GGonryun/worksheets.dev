import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ArrowUpRight } from '../icons/arrow-up-right';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import { PLACEHOLDER_IMAGE_URL } from '../layout/util';

export type CategoryPillProps = {
  name: string;
  id: string;
  href?: string;
  hideArrow?: boolean;
  height?: string;
  imageUrl?: string;
};

export const CategoryPill: FC<CategoryPillProps> = ({
  hideArrow,
  name,
  href,
  id,
  height,
  imageUrl,
}) => {
  return (
    <ReferencePillSkeleton
      href={href ?? `/c/${id}`}
      height={height}
      image={{
        padding: 0,
        src: imageUrl ?? PLACEHOLDER_IMAGE_URL,
        alt: `${name} logo`,
      }}
    >
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
            display: hideArrow ? 'none' : 'block',
            fontSize: '2rem',
            color: (theme) => theme.palette.primary.main,
          }}
        />
      </Box>
    </ReferencePillSkeleton>
  );
};
