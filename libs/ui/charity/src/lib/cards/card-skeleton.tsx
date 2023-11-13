import { Box, Divider, Link, Paper } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { ResponsiveImage } from '../images';

type CardSkeletonProps = {
  url: string;
  image: string;
  children: ReactNode;
};

export const CardSkeleton: FC<CardSkeletonProps> = ({
  url,
  image,
  children,
}) => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <Paper
      elevation={hover ? 7 : 3}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        overflow: 'hidden',
        width: 275,
        height: 'fit-content',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: 150,
          overflow: 'hidden',
        }}
      >
        <Box position="absolute">
          <Link href={url} underline="none" color="inherit">
            <ResponsiveImage alt="image" src={image} />
          </Link>
        </Box>
      </Box>
      <Divider />
      <Box p={2}>{children}</Box>
    </Paper>
  );
};
