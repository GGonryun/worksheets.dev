import {
  Facebook,
  GitHub,
  Instagram,
  Reddit,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  Link,
  LinkProps,
  styled,
  Typography,
} from '@mui/material';
import {
  blogRoutes,
  contestsRoutes,
  externalRoutes,
  helpRoutes,
  playRoutes,
  portalRoutes,
} from '@worksheets/routes';
import { SponsorLogo } from '@worksheets/ui/components/logos';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { currentYear } from '@worksheets/util/time';
import { JSXElementConstructor } from 'react';

export const FooterSection = () => {
  return (
    <Box
      sx={{
        mt: -6,
        pt: 16,
        pb: 10,
        px: { xs: 0, sm: 4 },
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        background: (theme) =>
          theme.palette.background.marketing.gradients.blue.primary,
        zIndex: 1,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'unset' },
        }}
      >
        <SocialLinks />
        <Box py={{ xs: 2, sm: 2.5, md: 3 }} />
        <Subscribe />
        <br />
        <br />
        <Links />
      </Container>
    </Box>
  );
};

const SocialLinks = () => {
  const isSmall = useMediaQueryDown('md');

  const iconProps = {
    color: 'white' as const,
    fontSize: isSmall ? ('medium' as const) : ('large' as const),
  };

  return (
    <Box display="flex" gap={1} justifyContent="flex-end">
      <IconButton href={externalRoutes.social.youtube}>
        <YouTube {...iconProps} />
      </IconButton>
      <IconButton href={externalRoutes.social.instagram}>
        <Instagram {...iconProps} />
      </IconButton>
      <IconButton href={externalRoutes.social.facebook}>
        <Facebook {...iconProps} />
      </IconButton>
      <IconButton href={externalRoutes.social.reddit}>
        <Reddit {...iconProps} />
      </IconButton>
      <IconButton href={externalRoutes.social.github}>
        <GitHub {...iconProps} />
      </IconButton>
      <IconButton href={externalRoutes.social.twitter}>
        <Twitter {...iconProps} />
      </IconButton>
    </Box>
  );
};

const Subscribe = () => (
  <Box width="fit-content" display="flex" flexDirection="column" gap={2}>
    <Typography
      typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
      sx={{
        background: (theme) =>
          theme.palette.text.marketing.gradients.blue.light,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      Subscribe To Newsletter
    </Typography>
    <Box
      component={Link}
      href={portalRoutes.newsletter.subscribe.url()}
      sx={{
        cursor: 'pointer',
        p: 4,
        borderRadius: (theme) => theme.shape.borderRadius,
        backgroundColor: (theme) => theme.palette.primary.dark,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          textDecorationColor: (theme) => theme.palette.text.white,
        },
      }}
    >
      <Typography
        color="text.white"
        typography={{ xs: 'body1', sm: 'h6' }}
        fontWeight={{ xs: 700, sm: 700 }}
      >
        charity.gamer@gmail.com
      </Typography>
    </Box>
  </Box>
);

const Links = () => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Box
      display="flex"
      justifyContent={{ xs: 'center', sm: 'space-between' }}
      alignItems={{ xs: 'center', sm: 'flex-end' }}
      gap={2}
      flexWrap="wrap"
    >
      <Typography
        textAlign="center"
        variant="body1"
        fontWeight={700}
        color={(theme) => theme.palette.text.blue.lightest}
      >
        © {currentYear} Charity Games. All rights reserved.
      </Typography>
      <Box
        component={Link}
        href={helpRoutes.about.url()}
        sx={{
          textDecoration: 'none',
        }}
      >
        <SponsorLogo />
      </Box>
    </Box>
    <Box
      display="flex"
      justifyContent={{ xs: 'center', sm: 'space-between' }}
      gap={2}
      flexWrap="wrap"
    >
      <Box display="flex" gap={2} justifyContent="center">
        <CustomLink href={helpRoutes.about.url()}>About</CustomLink>
        <CustomLink href={helpRoutes.contact.url()}>Contact</CustomLink>
        <CustomLink href={helpRoutes.terms.url()}>Terms</CustomLink>
        <CustomLink href={helpRoutes.privacy.url()}>Privacy</CustomLink>
      </Box>
      <Box display="flex" gap={2} justifyContent="center">
        <CustomLink href={playRoutes.home.url()}>Arcade</CustomLink>
        <CustomLink href={contestsRoutes.raffles.url()}>Raffles</CustomLink>
        <CustomLink href={helpRoutes.home.url()}>Help</CustomLink>
        <CustomLink href={blogRoutes.home.url()}>Blog</CustomLink>
      </Box>
    </Box>
  </Box>
);

const CustomLink = styled<JSXElementConstructor<LinkProps>>((props) => (
  <Link variant="body1" underline="hover" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.blue.lightest,
  fontWeight: 700,
}));
