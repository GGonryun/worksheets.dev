import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ArrowUpRight } from '../icons/arrow-up-right';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import { PLACEHOLDER_LOGO_PATH } from '../util';

export type GamePillProps = {
  name: string;
  developer: string;
  imageUrl?: string;
  href: string;
};

export const GamePill: FC<GamePillProps> = ({
  name,
  developer,
  imageUrl,
  href,
}) => {
  return (
    <ReferencePillSkeleton
      href={href}
      image={{
        padding: 1,
        src: imageUrl ?? PLACEHOLDER_LOGO_PATH,
        alt: `${name} logo`,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flex={1}
        justifyContent="space-between"
        minWidth={0}
        sx={{
          '& p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
      >
        <Box minWidth={0} px={1}>
          <Typography
            sx={{
              lineHeight: '1rem',
              fontSize: '1.2rem',
              fontWeight: '900',
              fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: (theme) => theme.palette.text.secondary,
              fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
            }}
          >
            by {developer}
          </Typography>
        </Box>

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
