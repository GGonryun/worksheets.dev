import { Box, BoxProps, styled } from '@mui/material';
import common from '@worksheets/assets-common';
import { routes } from '@worksheets/routes';
import { ContainImage } from '@worksheets/ui/components/images';
import { JSXElementConstructor } from 'react';

const purposeHref = routes.newsletter.subscribe.path();

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
    <ContainImage
      src={common.charityGames.banners.playWithPurpose}
      alt={playWithPurposeAlt}
    />
  </PlayWithPurposeBox>
);

export const PlayWithPurposeIcon = () => (
  <PlayWithPurposeBox
    sx={{
      aspectRatio: '1/1',
      maxWidth: 300,
    }}
  >
    <ContainImage
      src={common.charityGames.art.playWithPurpose}
      alt={playWithPurposeAlt}
    />
  </PlayWithPurposeBox>
);
