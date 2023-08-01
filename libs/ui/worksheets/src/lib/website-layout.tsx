import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAltOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgentOutlined';
import AssignmenIcon from '@mui/icons-material/AssignmentOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import { Button, Link, Paper, Tooltip, useMediaQuery } from '@mui/material';
import AccountMenu from './account-menu';
import { useUser } from '@worksheets/util/auth/client';
import { useRouter } from 'next/router';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { useEffect } from 'react';
import { Feedback, HubOutlined, Warning } from '@mui/icons-material';
import { Emoji } from '@worksheets/ui/common';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export type LayoutProps = { children: React.ReactNode; secure?: boolean };
export default function WebsiteLayout({
  secure = true,
  children,
}: LayoutProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { push } = useRouter();
  const { user, loading } = useUser();

  React.useEffect(() => {
    if (secure && !user && !loading) {
      push('/');
    }
  }, [secure, user, loading, push]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let topSections = [
    { text: 'Dashboard', link: '/dashboard', icon: <ListAltIcon /> },
    { text: 'Connections', link: '/connections', icon: <HubOutlined /> },
    { text: 'Settings', link: '/settings', icon: <SettingsIcon /> },
  ];
  const bottomSections = [
    { text: 'Applications', link: '/applications', icon: <AppsIcon /> },
    {
      text: 'Documentation',
      link: `${SERVER_SETTINGS.WEBSITES.DOCS_URL()}`,
      icon: <AssignmenIcon />,
    },
    {
      text: 'Support',
      link: `${SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}`,
      icon: <SupportAgentIcon />,
    },
  ];

  if (!secure && !user) {
    topSections = [];
  }

  return (
    <>
      <MobileWarning />
      <CssBaseline />
      <Box height="100%" display="flex">
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {!open && <Title />}
            </Box>
            <Box display="flex" alignItems={'center'} gap={1}>
              <FeedbackButton />
              <AccountMenu secure={secure} />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{ justifyContent: 'space-between', pl: 2 }}>
            <Title />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {topSections.map(({ text, icon, link }) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  href={link}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {bottomSections.map(({ text, link, icon }) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  href={link}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {/* remove the offset created by the drawer header */}
          <Box height="calc(100% - 64px)">{children}</Box>
        </Box>
      </Box>
    </>
  );
}

const FeedbackButton = () => {
  return (
    <Tooltip title={'Share your thoughts with us'}>
      <span>
        <IconButton href={SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}>
          {/* contrast with the primary color */}
          <Feedback
            sx={(theme) => ({
              color: theme.palette.primary.contrastText,
            })}
          />
        </IconButton>
      </span>
    </Tooltip>
  );
};

const Title: React.FC = () => (
  <Typography variant="h6" noWrap component="div">
    <Link href="/dashboard" color="inherit" underline="hover">
      Worksheets
    </Link>
  </Typography>
);

const MobileWarning: React.FC = () => {
  const { query } = useRouter();
  const evaluation = query.evaluation === 'true';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (evaluation && isMobile) {
      setOpen(true);
    }
  }, [evaluation, isMobile]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 10000,
        p: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box display="flex" alignItems="center" flexDirection="column" gap={4}>
          <Warning sx={{ fontSize: 100 }} color="warning" />
          <Typography variant="h6">
            Worksheets.dev is not optimized for mobile devices.
          </Typography>

          <Button
            data-test-id="accept-mobile-warning"
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            CONTINUE ANYWAY
          </Button>
          <Typography variant="body1">
            Or visit our{' '}
            <Link href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL()}`}>
              mobile optimized doc site.
            </Link>
          </Typography>
          <Tooltip title={'Let us know you want a mobile optimized site!'}>
            <span>
              <Button data-test-id="feature-request-mobile-site">
                <Emoji label={'bell'} symbol={128718} />
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};
