import { Box, Link, LinkProps, styled } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { ResponsiveImage } from '../../../images';
import { GameSchema } from '@worksheets/util/types';
import {
  APP_STORE_BADGE_PATH,
  PLAY_STORE_BADGE_PATH,
} from '@worksheets/util/assets';

export type MarketWidgetsProps = GameSchema['markets'];
export const MarketWidgets: FC<MarketWidgetsProps> = ({
  android,
  ios,
  steam,
  itch,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      pt={2}
    >
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
