import { Box, Link, LinkProps, styled } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { MarketLinks } from '../../../util';
import { ResponsiveImage } from '../../../images';

export type MarketWidgetsProps = Partial<MarketLinks>;
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
      <Box display={ios || android ? 'flex' : 'none'} gap={1}>
        <ResponsiveImageLink
          href={android}
          src="/common/google-play/badge.svg"
          alt="Google Play Badge"
          height={{ xs: 44, sm: 54 }}
          width={{ xs: 146, sm: 180 }}
        />
        <ResponsiveImageLink
          href={ios}
          src="/common/app-store/badge.svg"
          alt="App Store Badge"
          height={{ xs: 44, sm: 54 }}
          width={{ xs: 142, sm: 162 }}
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
