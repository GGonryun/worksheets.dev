import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ArrowUpRight } from '../icons/arrow-up-right';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import { PLACEHOLDER_LOGO_PATH } from '../util';

export type CategoryPillProps = {
  name: string;
  id: string;
  href?: string;
  hideArrow?: boolean;
  imageUrl?: string;
};

export const CategoryPill: FC<CategoryPillProps> = ({
  hideArrow,
  name,
  href,
  id,
  imageUrl,
}) => {
  return (
    <ReferencePillSkeleton
      href={href ?? `/c/${id}`}
      image={{
        padding: 0,
        src: imageUrl ?? PLACEHOLDER_LOGO_PATH,
        alt: `${name} logo`,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
        px={2}
      >
        <Typography
          variant="body2"
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
