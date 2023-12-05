import { FC, JSXElementConstructor } from 'react';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Reddit from '@mui/icons-material/Reddit';
import GitHub from '@mui/icons-material/GitHub';
import Twitter from '@mui/icons-material/Twitter';
import Link, { LinkProps } from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useRouter } from 'next/router';
import urls from '@worksheets/util/urls';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { SvgIconComponent } from '@mui/icons-material';

export type WebsiteFooterProps = {
  // TODO: args
};

const currentYear = new Date().getFullYear();

export const WebsiteFooter: FC<WebsiteFooterProps> = () => {
  const { push } = useRouter();

  return (
    <FooterContainer className="footer-container">
      <FooterLinksContainer>
        <Box display="flex" gap={2}>
          <SocialIcon
            Icon={LinkedIn}
            onClick={() => push(urls.social.linkedIn)}
          />
          <SocialIcon
            Icon={Twitter}
            onClick={() => push(urls.social.twitter)}
          />
          <SocialIcon Icon={Reddit} onClick={() => push(urls.social.reddit)} />
          <SocialIcon Icon={GitHub} onClick={() => push(urls.social.github)} />
        </Box>
        <Box display="flex" gap={3}>
          <FooterLink href={'/charity'}>Charity</FooterLink>
          <FooterLink href={'/about'}>About</FooterLink>
          <FooterLink href={'/blog'}>Blog</FooterLink>
          <FooterLink href={'/contact'}>Contact</FooterLink>
        </Box>
      </FooterLinksContainer>
      <FooterSubLinksContainer>
        <Box>
          <CopywriteText>Copyright © {currentYear} Charity.Games</CopywriteText>
        </Box>
        <Box display="flex" gap={2}>
          <FooterSubLink href={'/help'}>Help</FooterSubLink>
          <FooterSubLink href={'/faq'}>FAQ</FooterSubLink>
          <FooterSubLink href={'/terms'}>Terms</FooterSubLink>
          <FooterSubLink href={'/privacy'}>Privacy</FooterSubLink>
          <FooterSubLink href={'/cookies'}>Cookies</FooterSubLink>
        </Box>
      </FooterSubLinksContainer>
    </FooterContainer>
  );
};

const FooterLink = styled((props) => <Link {...props} />)<LinkProps>(
  ({ theme }) => ({
    color: theme.palette.error.light,
    fontFamily: theme.typography.dangrek.fontFamily,
    textShadow: textShadow(0.5, 0.5),
    fontSize: '1.15rem',
    textDecorationColor: theme.palette.error.light,
    textDecoration: 'none',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '@media (max-width: 600px)': {
      fontSize: '.90rem',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  })
);

const SocialIcon = styled<
  JSXElementConstructor<SvgIconProps & { Icon: SvgIconComponent }>
>(({ Icon, ...props }) => <Icon {...props} />)(({ theme }) => ({
  color: theme.palette.error.light,
  filter: svgBoxShadow(1.5, 0.5),
  cursor: 'pointer',
}));

const FooterLinksContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    gap: theme.spacing(2),
  })
);

const FooterSubLinksContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  })
);

const CopywriteText = styled((props) => (
  <Typography {...props} />
))<TypographyProps>(({ theme }) => ({
  color: theme.palette.error.light,
  fontFamily: theme.typography.mPlus1p.fontFamily,
  fontWeight: 600,
  fontSize: '0.85rem',
  textShadow: textShadow(0.5, 0.5),
  textTransform: 'uppercase',
  '@media (max-width: 600px)': {
    fontSize: '.7rem',
  },
}));

const FooterSubLink = styled((props) => <Link {...props} />)<LinkProps>(
  ({ theme }) => ({
    color: theme.palette.error.light,
    fontFamily: theme.typography.mPlus1p.fontFamily,
    fontWeight: 700,
    fontSize: '1rem',
    textShadow: textShadow(0.5, 0.5),
    textDecoration: 'underline',
    cursor: 'pointer',
    '@media (max-width: 600px)': {
      fontSize: '.8rem',
    },
  })
);

const FooterContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    position: 'relative',
    bottom: 0,
    filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.3))',
    '::before': {
      content: '""',
      backgroundColor: theme.palette.background.paper,
      // clipPath: 'polygon(0 100%,30% 0,60% 100%,100% 0,100% 100%)',
      clipPath: 'polygon(83% 0%, 100% 100%, 0% 100%, 17.75% 0%, 45% 100%)',
      // clipPath: 'polygon(47% 100%, 87% 91%, 100% 100%, 0 100%, 13% 91%)',
      top: -11,
      height: 12,
      left: 0,
      marginBottom: -1,
      position: 'absolute',
      right: 0,
    },
  })
);

const svgBoxShadow = (height = 1.5, power = 0.5) =>
  `drop-shadow(${height * 0.75}px ${
    height * 0.75
  }px ${height}px rgba(0, 0, 0, ${power}))`;

const textShadow = (height = 1.5, power = 0.5) =>
  `rgba(0, 0, 0, ${power}) ${height * 0.75}px ${height * 0.75}px ${height}px`;
