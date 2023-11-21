import {
  LocalFireDepartmentOutlined,
  QuestionMark,
  Replay,
  Star,
  SvgIconComponent,
} from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { BannerBox } from './banner-box';
import { ResponsiveImage } from '../images';

type GameIconBanner = 'hot' | 'new' | 'played' | 'none';

export type GameIconProps = {
  name: string;
  iconUrl?: string;
  banner?: GameIconBanner;
};

const BannerIcon: Record<GameIconBanner, SvgIconComponent> = {
  none: QuestionMark,
  hot: LocalFireDepartmentOutlined,
  new: Star,
  played: Replay,
};

const BannerColor: Record<GameIconBanner, string> = {
  none: '#fff',
  hot: 'error.main',
  new: 'highlight.main',
  played: 'primary.main',
};

const PLACEHOLDER_IMAGE_URL =
  'https://storage.googleapis.com/game-logos/placeholder.png';
export const GameIcon: FC<GameIconProps> = ({ name, iconUrl, banner }) => {
  const Icon = BannerIcon[banner ?? 'none'];
  const [hover, setHover] = useState(false);
  return (
    <Link href="#" underline="none">
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          position: 'relative',
          display: 'flex',
          borderRadius: (theme) => theme.shape.borderRadius,
          top: 0,
          height: 94,
          width: 94,
          boxShadow: (theme) => theme.shadows[2],
          boxSizing: 'border-box',
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
        <ResponsiveImage
          priority
          src={iconUrl ?? PLACEHOLDER_IMAGE_URL}
          alt={`${name} logo`}
          style={{
            overflow: 'hidden',
            borderRadius: 'inherit',
          }}
        />
        {banner && (
          <BannerBox>{<Icon sx={{ color: BannerColor[banner] }} />}</BannerBox>
        )}
        <Box
          display="flex"
          position="absolute"
          bottom={0}
          left={0}
          width="100%"
          alignItems="center"
          textAlign="center"
          overflow="hidden"
          sx={{
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.standard * 1.5,
              }),
            opacity: hover ? 1 : 0,

            userSelect: 'none',
            borderRadius: 'inherit',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <Typography
            sx={{
              width: '100%',
              color: (theme) => theme.palette.white.main,
              fontSize: '0.8rem',
              fontWeight: 900,
              fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
              padding: '0.2rem 0.4rem',
              background: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)`,
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};
