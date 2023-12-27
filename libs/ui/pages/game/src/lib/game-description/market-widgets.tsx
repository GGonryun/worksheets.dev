import { Box, Link, LinkProps, Typography, styled } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { GameSchema } from '@worksheets/util/types';
import {
  APP_STORE_BADGE_PATH,
  PLAY_STORE_BADGE_PATH,
} from '@worksheets/util/assets';
import { ResponsiveImage } from '@worksheets/ui/images';

export type MarketWidgetsProps = GameSchema['markets'];
export const MarketWidgets: FC<MarketWidgetsProps> = ({
  android,
  ios,
  steam,
  itch,
}) => {
  if (!android && !ios && !steam && !itch) return null;

  return (
    <Box display="flex" flexDirection="column" gap={2} my={2}>
      <Typography variant="h4">Purchase</Typography>
      <Box display={ios || android ? 'flex' : 'none'} gap={1} flexWrap={'wrap'}>
        <ResponsiveImageLink
          href={ios}
          src={APP_STORE_BADGE_PATH}
          alt="App Store Badge"
          height={54}
          width={162}
        />
        <ResponsiveImageLink
          href={android}
          src={PLAY_STORE_BADGE_PATH}
          alt="Google Play Badge"
          height={54}
          width={180}
        />
      </Box>
      <SteamWidgetBox display={steam ? 'block' : 'none'}>
        <StyledIFrame title="steam-campaign" src={steam} />
      </SteamWidgetBox>
      <ItchWidgetBox display={itch ? 'block' : 'none'}>
        <StyledIFrame title="itch.io" src={itch} />
      </ItchWidgetBox>
    </Box>
  );
};

const ResponsiveImageLink = styled<
  JSXElementConstructor<LinkProps & { src: string; alt: string }>
>(({ src, alt, ...props }) => (
  <Link underline="none" {...props}>
    <ResponsiveImage src={src} alt={alt} />
  </Link>
))(({ theme, href }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: href ? 'flex' : 'none',
}));

const ItchWidgetBox = styled(Box)({
  width: '95%',
  maxWidth: '552px',
  height: '167px',
});

const SteamWidgetBox = styled(Box)({
  width: '95%',
  maxWidth: '552px',
  height: '190px',
});

const StyledIFrame = styled('iframe')({
  width: '100%',
  border: 'none',
  height: '100%',
});
