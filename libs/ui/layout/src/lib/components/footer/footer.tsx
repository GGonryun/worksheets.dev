import { YouTube } from '@mui/icons-material';
import Box, { BoxProps } from '@mui/material/Box';
import Link, { LinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { blogRoutes, externalRoutes, routes } from '@worksheets/routes';
import { copyright } from '@worksheets/util/settings';
import Image from 'next/image';
import { JSXElementConstructor } from 'react';

import { LayoutLinks } from '../../types';
import { LogoBox } from '../shared/logo-box';

export const WebsiteFooter: React.FC<{
  links?: LayoutLinks;
}> = ({ links }) => {
  return (
    <FooterContainer className="footer-container">
      <Box
        display="flex"
        alignItems="center"
        gap={{ xs: 2, sm: 4 }}
        justifyContent={{ xs: 'space-evenly', sm: 'center' }}
      >
        <Box component="a" href={externalRoutes.social.youtube}>
          <YouTube
            fontSize="large"
            sx={{ color: (theme) => theme.palette.error.main }}
          />
        </Box>
        <Box component="a" href={externalRoutes.social.instagram}>
          <Image
            src="/icons/social/instagram.png"
            alt={'Instagram Logo'}
            height={24}
            width={24}
          />
        </Box>
        <Box component="a" href={externalRoutes.social.reddit}>
          <Image
            src="/icons/social/reddit.png"
            alt={'Reddit Logo'}
            height={24}
            width={24}
          />
        </Box>
        <Box component="a" href={externalRoutes.social.github}>
          <Image
            src="/icons/social/github.png"
            alt={'GitHub Logo'}
            height={24}
            width={24}
          />
        </Box>
        <Box component="a" href={externalRoutes.social.twitter}>
          <Image
            src="/icons/social/twitter.png"
            alt={'Twitter Logo'}
            height={24}
            width={24}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        my={-2}
      >
        <LogoBox rootHref={links?.root ?? routes.home.url()} />
        <CopyrightText>{copyright}</CopyrightText>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexWrap={{ xs: 'wrap', sm: 'wrap', desktop2: 'nowrap' }}
        gap={{ xs: 2, sm: 3 }}
        justifyContent={{
          xs: 'space-evenly',
          sm: 'space-evenly',
          md: 'center',
          desktop2: 'center',
        }}
      >
        <FooterLinkTypography href={links?.blog ?? blogRoutes.home.url()}>
          Blog
        </FooterLinkTypography>
        <FooterLinkTypography href={links?.about ?? routes.about.url()}>
          About
        </FooterLinkTypography>
        <FooterLinkTypography href={links?.help ?? routes.help.url()}>
          Help
        </FooterLinkTypography>
        <FooterLinkTypography href={links?.cookies ?? routes.cookies.url()}>
          Cookies
        </FooterLinkTypography>
        <FooterLinkTypography href={links?.privacy ?? routes.privacy.url()}>
          Privacy
        </FooterLinkTypography>
        <FooterLinkTypography href={links?.terms ?? routes.terms.url()}>
          Terms
        </FooterLinkTypography>
      </Box>
    </FooterContainer>
  );
};

const FooterLinkTypography = styled<JSXElementConstructor<LinkProps>>(
  (props) => (
    <Typography
      component={Link}
      underline="hover"
      color="text.red.light"
      {...props}
    />
  )
)({
  fontWeight: 700,
  cursor: 'pointer',
});

const CopyrightText = styled((props) => (
  <Typography {...props} />
))<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.red.light,
  fontFamily: theme.typography.body3.fontFamily,
  fontWeight: 700,
  fontSize: theme.typography.body3.fontSize,
  textTransform: 'uppercase',
}));

const FooterContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    gap: theme.spacing(4),
    position: 'relative',
    bottom: 0,
    padding: theme.spacing(2),
    background: theme.palette.background['gradient-soft'],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    [theme.breakpoints.up('desktop2')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      alignItems: 'center',
      padding: theme.spacing(4),
    },
  })
);
