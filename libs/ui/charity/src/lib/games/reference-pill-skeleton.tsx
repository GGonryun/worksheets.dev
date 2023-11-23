import { Box, Link } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ResponsiveImage } from '../images';

export type ReferencePillSkeletonProps = {
  children: ReactNode;
  href: string;
  height?: number | string;
  image: { padding: number | string; src: string; alt: string };
};

export const ReferencePillSkeleton: FC<ReferencePillSkeletonProps> = ({
  href,
  height,
  image,
  children,
}) => (
  <Link href={href} underline="none">
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        position: 'relative',
        display: 'flex',
        borderRadius: (theme) => theme.shape.borderRadius,
        top: 0,
        height: height ?? '100%',
        width: '100%',
        boxShadow: (theme) => theme.shadows[2],
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: (theme) =>
          theme.transitions.create(['top', 'box-shadow'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
          }),
        '&:hover': {
          top: -4,
          boxShadow: (theme) => theme.shadows[6],
        },
      }}
    >
      <Box
        sx={{
          padding: image.padding ?? 0,
          aspectRatio: '1 / 1',
        }}
      >
        <ResponsiveImage priority alt={image.alt} src={image.src} />
      </Box>
      {children}
    </Box>
  </Link>
);
