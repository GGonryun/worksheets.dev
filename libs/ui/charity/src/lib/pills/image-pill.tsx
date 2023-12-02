import { FC } from 'react';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import { Box, Typography } from '@mui/material';
import { ContainImage } from '../images/contain-image';

export type ImagePillProps = {
  subtitle?: string;
  href?: string;
  alt: string;
  src: string;
};
export const ImagePill: FC<ImagePillProps> = ({ href, subtitle, alt, src }) => (
  <ReferencePillSkeleton href={href}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        p: 1,
        gap: 1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <ContainImage src={src} alt={alt} />
      </Box>
      <Typography
        variant={'body3'}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  </ReferencePillSkeleton>
);
