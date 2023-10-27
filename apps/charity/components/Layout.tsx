import {
  GitHub,
  LinkedIn,
  Reddit,
  SvgIconComponent,
} from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Divider,
  Link,
  LinkProps,
  SvgIconProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';
import { textShadow, urls, svgBoxShadow, Discord } from '@worksheets/ui-games';
import { useRouter } from 'next/router';
import { FC, JSXElementConstructor, ReactNode } from 'react';

export const Layout: FC<{
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
}> = ({ header, content, footer }) => {
  const shrink = { flexShrink: 0 };
  const grow = { flex: '1 0 auto' };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <Box sx={shrink}>{header}</Box>
      <Box sx={grow}>{content}</Box>
      <Box sx={shrink}>{footer}</Box>
    </Box>
  );
};

export const WebsiteLayout: FC<{
  children: ReactNode;
  hideNavigationBar?: boolean;
}> = ({ children, hideNavigationBar }) => {
  const { push } = useRouter();
  return (
    <Layout
      header={
        <>
          <HeroSection />
          <SectionDivider />
          <NavigationBar />
          <SectionDivider />
        </>
      }
      content={children}
      footer={
        <>
          <SectionDivider />
          <CharityTextContainer>
            <CharityText>
              <LearnMoreLink href={urls.relative.about}>
                Charity.Games
              </LearnMoreLink>{' '}
              is committed to providing fun, free games that help support
              charitable causes.{' '}
              <LearnMoreLink href={urls.relative.about}>
                Learn More
              </LearnMoreLink>
              .
            </CharityText>
          </CharityTextContainer>
          <SectionDivider />
          <FooterContainer>
            <FooterLinksContainer>
              <Box display="flex" gap={2}>
                <SocialIcon
                  Icon={LinkedIn}
                  onClick={() => push(urls.social.linkedIn)}
                />
                <SocialIcon
                  Icon={Reddit}
                  onClick={() => push(urls.social.personalGithub)}
                />
                <SocialIcon
                  Icon={GitHub}
                  onClick={() => push(urls.social.github)}
                />
                <SocialIcon
                  Icon={Discord}
                  onClick={() => push(urls.social.discord)}
                />
              </Box>
              <Box display="flex" gap={3}>
                <FooterLink href={urls.relative.donate}>Donate</FooterLink>
                <FooterLink href={urls.relative.faq}>FAQ</FooterLink>
                <FooterLink href={urls.relative.contact}>Contact</FooterLink>
              </Box>
            </FooterLinksContainer>
            <FooterSubLinksContainer>
              <Box>
                <CopywriteText>Copyright © 2023 Charity.Games</CopywriteText>
              </Box>
              <Box display="flex" gap={2}>
                <FooterSubLink href={urls.relative.directory}>
                  Directory
                </FooterSubLink>
                <FooterSubLink href={urls.relative.terms}>Terms</FooterSubLink>
                <FooterSubLink href={urls.relative.privacy}>
                  Privacy
                </FooterSubLink>
                <FooterSubLink href={urls.relative.cookies}>
                  Cookies
                </FooterSubLink>
              </Box>
            </FooterSubLinksContainer>
          </FooterContainer>
        </>
      }
    />
  );
};

const CharityText = styled((props) => (
  <Typography {...props} />
))<TypographyProps>(({ theme }) => ({
  textAlign: 'center',
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 500,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  fontSize: '1.25rem',
  '@media (max-width: 600px)': {
    fontSize: '1rem',
  },
}));

const LearnMoreLink = styled((props) => <Link {...props} />)<LinkProps>(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    textDecorationColor: theme.palette.text.primary,
  })
);

const FooterLink = styled((props) => <Link {...props} />)<LinkProps>(
  ({ theme }) => ({
    color: 'white',
    fontFamily: theme.typography.secondary.fontFamily,
    fontWeight: 900,
    fontSize: '1.15rem',
    textShadow: textShadow(1.5, 1),
    textDecorationColor: 'white',
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
  color: theme.palette.primary.contrastText,
  filter: svgBoxShadow(1.5, 1),
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
  color: 'white',
  fontFamily: theme.typography.secondary.fontFamily,
  fontWeight: 600,
  fontSize: '0.8rem',
  textShadow: textShadow(1, 0.5),
  textTransform: 'uppercase',
  '@media (max-width: 600px)': {
    fontSize: '.6rem',
  },
}));

const FooterSubLink = styled((props) => <Link {...props} />)<LinkProps>(
  ({ theme }) => ({
    color: 'white',
    fontFamily: theme.typography.secondary.fontFamily,
    fontWeight: 600,
    fontSize: '0.8rem',
    textShadow: textShadow(1, 0.5),
    textDecoration: 'underline',
    cursor: 'pointer',
    '@media (max-width: 600px)': {
      fontSize: '.7rem',
    },
  })
);

const SectionDivider = styled((props) => <Divider {...props} />)<BoxProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.grey[500],
  })
);

const CharityTextContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    flexShrink: 0,
    display: 'flex',
    width: '100%',
    zIndex: -1,
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[300],
    padding: 20,
    gap: theme.spacing(3),
  })
);

const HeroSection: FC = () => {
  const { push } = useRouter();

  return (
    <TitleContainer>
      <TitleText
        onClick={() => {
          push(urls.relative.home);
        }}
      >
        Charity.Games
      </TitleText>
      <SubtitleText>Play with Purpose</SubtitleText>
    </TitleContainer>
  );
};

const TitleContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '140px',
    zIndex: -1,
    backgroundColor: theme.palette.primary.light,
    '@media (max-width: 600px)': {
      height: '120px',
    },
  })
);

const FooterContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    flexShrink: 0,
    display: 'flex',
    width: '100%',
    zIndex: -1,
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.light,
    padding: 20,
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  })
);

const NavigationBar = () => {
  const { pathname } = useRouter();

  return (
    <NavigationBarContainer>
      <NavigationButton
        href={urls.relative.home}
        active={pathname === '/' || pathname.startsWith(urls.relative.games)}
      >
        Games
      </NavigationButton>
      <NavigationButton
        href={urls.relative.blog}
        active={pathname.startsWith(urls.relative.blog)}
      >
        Blog
      </NavigationButton>
      <NavigationButton
        href={urls.relative.about}
        active={pathname.startsWith(urls.relative.about)}
      >
        About
      </NavigationButton>
    </NavigationBarContainer>
  );
};

const NavigationBarContainer = styled((props) => <Box {...props} />)<BoxProps>({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  minHeight: '80px',
  '@media (max-width: 600px)': {
    minHeight: '60px',
  },
  backgroundColor: 'white',
});

type NavigationBarButtonProps = ButtonProps & { active?: boolean };

const NavigationButton = styled(
  (props) => <Button disableRipple {...props} />,
  { shouldForwardProp: (prop) => prop !== 'active' }
)<NavigationBarButtonProps>(({ theme, active }) => ({
  textTransform: 'none',
  fontSize: '1.50rem',
  color: active ? theme.palette.primary.main : theme.palette.grey[700],
  fontWeight: 600,
  fontFamily: theme.typography.primary.fontFamily,
  textDecoration: active ? 'underline' : 'none',
  '@media (max-width: 600px)': {
    fontSize: '1.25rem',
  },
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: 'transparent',
    color: active ? theme.palette.primary.main : theme.palette.grey[900],
  },
}));

const TitleText = styled((props) => <Typography {...props} />)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.primary.contrastText,
    textShadow: textShadow(1.5, 1),
    fontSize: '3.5rem',
    fontWeight: 800,
    fontFamily: theme.typography.secondary.fontFamily,
    '@media (max-width: 600px)': {
      fontSize: '3.0rem',
    },
    '@media (max-width: 400px)': {
      fontSize: '2.5rem',
    },
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  })
);

const SubtitleText = styled((props) => (
  <Typography {...props} />
))<TypographyProps>(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textShadow: textShadow(1, 0.75),
  fontSize: '1.5rem',
  fontWeight: 500,
  fontFamily: theme.typography.secondary.fontFamily,
  '@media (max-width: 600px)': {
    fontSize: '1.25rem',
  },
}));
