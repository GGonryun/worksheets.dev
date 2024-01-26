import Box, { BoxProps } from '@mui/material/Box';
import Link, { LinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import urls from '@worksheets/util/urls';
import Image from 'next/image';
import { JSXElementConstructor } from 'react';

import { LogoBox } from '../shared/logo-box';

const currentYear = new Date().getFullYear();

export const WebsiteFooter: React.FC = () => {
  return (
    <FooterContainer className="footer-container">
      <Box
        display="flex"
        alignItems="center"
        gap={{ xs: 2, sm: 4 }}
        justifyContent={{ xs: 'space-evenly', sm: 'center' }}
      >
        <Box component="a" href={urls.social.instagram}>
          <Image
            src="/common/icons/instagram.png"
            alt={'Instagram Logo'}
            height={24}
            width={24}
          />
        </Box>
        <Image
          src="/common/icons/reddit.png"
          alt={'Instagram Logo'}
          height={24}
          width={24}
        />
        <Image
          src="/common/icons/github.png"
          alt={'Instagram Logo'}
          height={24}
          width={24}
        />
        <Image
          src="/common/icons/twitter.png"
          alt={'Instagram Logo'}
          height={24}
          width={24}
        />
      </Box>

      <Box
        position={{ sm: 'relative', desktop2: 'absolute' }}
        left={0}
        right={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <LogoBox />
        <CopyrightText>© {currentYear} Charity.Games</CopyrightText>
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
        <FooterLinkTypography href={'/charity'}>Charity</FooterLinkTypography>
        <FooterLinkTypography href={'/help'}>Help</FooterLinkTypography>
        <FooterLinkTypography href={'/cookies'}>Cookies</FooterLinkTypography>
        <FooterLinkTypography href={'/privacy'}>Privacy</FooterLinkTypography>
        <FooterLinkTypography href={'/terms'}>Terms</FooterLinkTypography>
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
  color: theme.palette.text.red.dark,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(4),
    },
  })
);
