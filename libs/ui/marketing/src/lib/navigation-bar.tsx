import {
  Hub,
  Apps,
  Article,
  ContactSupport,
  MoreVert,
} from '@mui/icons-material';
import {
  Toolbar,
  Divider,
  IconButton,
  Button,
  darken,
  AppBar,
  Theme,
  CSSObject,
  styled,
  ListItemIcon,
  ButtonProps,
  lighten,
  Box,
} from '@mui/material';
import {
  MarketingHeader,
  useUser,
  AccountMenu,
  urls,
  useLayout,
} from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { Flex } from '@worksheets/ui-core';
import { TinyMenu, TinyMenuItem } from '@worksheets/ui-basic-style';
import React from 'react';

const publicAppBarButtons = [
  {
    text: 'Features',
    href: urls.app.features,
    icon: <Hub fontSize="small" />,
  },
  {
    text: 'Applications',
    href: urls.app.applications,
    icon: <Apps fontSize="small" />,
  },
  {
    text: 'Documentation',
    href: urls.docs.home,
    icon: <Article fontSize="small" />,
  },
  {
    text: 'Contact Us',
    href: urls.app.contact,
    icon: <ContactSupport fontSize="small" />,
  },
];

type NavigationBarProps = { hideLinks?: boolean };

export const NavigationBar: React.FC<NavigationBarProps> = ({ hideLinks }) => {
  const { scroll, isTablet } = useLayout();

  return (
    <AppBar position="fixed" color="inherit" elevation={scroll > 10 ? 4 : 0}>
      <Toolbar variant="dense">
        {isTablet ? (
          <MobilePublicNavigationBarContents hideLinks={hideLinks} />
        ) : (
          <DesktopPublicNavigationBarContents hideLinks={hideLinks} />
        )}
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

const DesktopPublicNavigationBarContents: React.FC<NavigationBarProps> = ({
  hideLinks,
}) => {
  const { route } = useRouter();

  return (
    <Flex spaceBetween fullWidth>
      <MarketingHeader />
      <Box>
        {!hideLinks && (
          <Flex gap={1}>
            {publicAppBarButtons.map((b) => (
              <MarketingBarButton
                key={b.text}
                startIcon={b.icon}
                href={b.href}
                color="inherit"
                disableRipple
                active={route.startsWith(b.href)}
              >
                {b.text}
              </MarketingBarButton>
            ))}
          </Flex>
        )}
      </Box>
      <SignInButton />
    </Flex>
  );
};

const MobileMarketingMenu: React.FC<{
  anchor?: HTMLElement;
  onClose: () => void;
}> = ({ anchor, onClose }) => {
  const { route, push } = useRouter();
  return (
    <TinyMenu
      horizontal="center"
      showArrow
      open={!!anchor}
      anchorEl={anchor}
      onClose={onClose}
    >
      {publicAppBarButtons.map((b) => (
        <TinyMenuItem
          key={b.text}
          selected={route.startsWith(b.href)}
          onClick={() => {
            push(b.href);
            onClose();
          }}
        >
          <ListItemIcon>{b.icon}</ListItemIcon>
          {b.text}
        </TinyMenuItem>
      ))}
    </TinyMenu>
  );
};

const MobilePublicNavigationBarContents: React.FC<NavigationBarProps> = ({
  hideLinks,
}) => {
  const [anchor, setAnchor] = React.useState<HTMLElement | undefined>();

  return (
    <>
      <Flex spaceBetween fullWidth>
        <MarketingHeader />

        <Flex>
          {!hideLinks && (
            <IconButton
              size="small"
              onClick={(e) => setAnchor(e.currentTarget)}
            >
              <MoreVert />
            </IconButton>
          )}
          <SignInButton />
        </Flex>
      </Flex>
      <MobileMarketingMenu
        anchor={anchor}
        onClose={() => setAnchor(undefined)}
      />
    </>
  );
};

const SignInButton = () => {
  const { route } = useRouter();

  const { user } = useUser();

  const loginHref = urls.app.login;
  const projectsHref = urls.app.projects;
  const onProjectsPage = route.startsWith(projectsHref);

  return user ? (
    <Flex gap={1}>
      <TextHoverButton href={urls.app.projects} active={onProjectsPage}>
        {onProjectsPage ? 'Viewing' : 'View'} projects
      </TextHoverButton>
      <AccountMenu />
    </Flex>
  ) : (
    <MarketingBarButton
      disableRipple
      color="primary"
      href={loginHref}
      active={route.startsWith(loginHref)}
    >
      <b>Sign In</b>
    </MarketingBarButton>
  );
};

const activeStyleMixin = (theme: Theme): CSSObject => ({
  marginBottom: -3,
  backgroundColor: 'transparent',
  borderBottom: `3px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
});

type MarketBarButtonProps = ButtonProps & { active?: boolean };

export const MarketingBarButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<MarketBarButtonProps>(({ theme, active }) => ({
  textTransform: 'none',
  color: darken(theme.palette.text.secondary, 0.5),
  borderRadius: 0,
  height: 32,
  boxSizing: 'content-box',
  '&.MuiButton-textPrimary': {
    color: theme.palette.primary.main,
  },
  ...(active && activeStyleMixin(theme)),
  '&:hover': activeStyleMixin(theme),
}));

const primaryHoverMixin = (theme: Theme): CSSObject => ({
  backgroundColor: lighten(theme.palette.primary.main, 0.85),
  textDecoration: 'underline',
});
export const TextHoverButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ButtonProps & { active?: boolean }>(({ theme, active }) => ({
  // padding
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  // more styles
  textTransform: 'none',
  color: theme.palette.primary.main,
  '&:hover': primaryHoverMixin(theme),
  // active
  ...(active && primaryHoverMixin(theme)),
}));
