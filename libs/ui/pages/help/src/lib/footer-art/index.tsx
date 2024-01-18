import { Box, BoxProps, styled } from '@mui/material';
import { ContainImage } from '@worksheets/ui/images';
import { JSXElementConstructor } from 'react';

const purposeHref = 'https://charity.games/charity';
const bannerUri = '/common/charity-games/banners/play-with-purpose.png';
const iconUri = '/common/charity-games/art/play-with-purpose.png';
const playWithPurposeAlt = 'Play With Purpose';

const PlayWithPurposeBox = styled<JSXElementConstructor<BoxProps>>((props) => (
  <Box component="a" href={purposeHref} {...props} />
))(({ theme }) => ({
  position: 'relative',
  height: 'auto',
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

export const PlayWithPurposeBanner = () => (
  <PlayWithPurposeBox
    sx={{
      aspectRatio: '800/184',
      maxWidth: 800,
    }}
  >
    <ContainImage src={bannerUri} alt={playWithPurposeAlt} />
  </PlayWithPurposeBox>
);

export const PlayWithPurposeIcon = () => (
  <PlayWithPurposeBox
    sx={{
      aspectRatio: '1/1',
      maxWidth: 300,
    }}
  >
    <ContainImage src={iconUri} alt={playWithPurposeAlt} />
  </PlayWithPurposeBox>
);
