import {
  Box,
  BoxProps,
  Link,
  LinkProps,
  SvgIconProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { textShadow, svgBoxShadow } from '../styles';
import {
  GitHub,
  LinkedIn,
  Reddit,
  SvgIconComponent,
} from '@mui/icons-material';
import { Discord } from '../icons/discord';
import { useRouter } from 'next/router';
import { urls } from './util';

export type WebsiteFooterProps = {
  // TODO: args
};

const currentYear = new Date().getFullYear();

export const WebsiteFooter: FC<WebsiteFooterProps> = () => {
  const { push } = useRouter();

  return (
    <FooterContainer>
      <FooterLinksContainer>
        <Box display="flex" gap={2}>
          <SocialIcon
            Icon={LinkedIn}
            onClick={() => push(urls.social.linkedIn)}
          />
          <SocialIcon Icon={Reddit} onClick={() => push(urls.social.reddit)} />
          <SocialIcon Icon={GitHub} onClick={() => push(urls.social.github)} />
          <SocialIcon
            Icon={Discord}
            onClick={() => push(urls.social.discord)}
          />
        </Box>
        <Box display="flex" gap={3}>
          <FooterLink href={'/about'}>About</FooterLink>
          <FooterLink href={'/developers'}>Developers</FooterLink>
          <FooterLink href={'/contact'}>Contact</FooterLink>
        </Box>
      </FooterLinksContainer>
      <FooterSubLinksContainer>
        <Box>
          <CopywriteText>Copyright © {currentYear} Charity.Games</CopywriteText>
        </Box>
        <Box display="flex" gap={2}>
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
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  })
);

const FooterSubLinksContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
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
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    position: 'relative',
    bottom: 0,
    filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.3))',
    '::before': {
      content: '""',
      backgroundColor: theme.palette.background.paper,
      // clipPath: 'polygon(0 100%,30% 0,60% 100%,100% 0,100% 100%)',
      clipPath: 'polygon(83% 0%, 100% 100%, 0% 100%, 17.75% 0%, 45% 100%)',
      // clipPath: 'polygon(47% 100%, 87% 91%, 100% 100%, 0 100%, 13% 91%)',
      top: -12,
      height: 12,
      left: 0,
      marginBottom: -1,
      position: 'absolute',
      right: 0,
    },
  })
);