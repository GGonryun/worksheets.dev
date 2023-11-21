import {
  LocalFireDepartmentOutlined,
  QuestionMark,
  Replay,
  Star,
  SvgIconComponent,
} from '@mui/icons-material';
import { Box, Link } from '@mui/material';
import { FC } from 'react';
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
  return (
    <Link href="#" underline="none" sx={{}}>
      <Box
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
        {/* TODO: display name on hover */}
      </Box>
    </Link>
  );
};
