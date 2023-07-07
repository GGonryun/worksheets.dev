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
import HubIcon from '@mui/icons-material/HubOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ScannerIcon from '@mui/icons-material/ScannerOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgentOutlined';
import AssignmenIcon from '@mui/icons-material/AssignmentOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import { Link } from '@mui/material';
import AccountMenu from './account-menu';
import { useUser } from '@worksheets/util/auth/client';
import { useRouter } from 'next/router';
import { SupportSpeedDial } from './support-speed-dial';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

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
  flexShrink: 0,
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
    { text: 'Worksheets', link: '/worksheets', icon: <ListAltIcon /> },
    { text: 'Connections', link: '/connections', icon: <HubIcon /> },
    { text: 'Settings', link: '/settings', icon: <SettingsIcon /> },
  ];
  const bottomSections = [
    { text: 'Templates', link: '/templates', icon: <ScannerIcon /> },
    { text: 'Applications', link: '/applications', icon: <AppsIcon /> },
    {
      text: 'Documentation',
      link: `${SERVER_SETTINGS.WEBSITES.DOCS_URL()}`,
      icon: <AssignmenIcon />,
    },
    {
      text: 'Support',
      link: `${SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}'`,
      icon: <SupportAgentIcon />,
    },
  ];

  if (!secure) {
    topSections = [];
  }

  return (
    <Box height="100%" display="flex">
      <CssBaseline />
      <SupportSpeedDial />
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
          <AccountMenu />
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
  );
}

const Title: React.FC = () => (
  <Typography variant="h6" noWrap component="div">
    <Link href="/" color="inherit" underline="hover">
      Worksheets.dev
    </Link>
  </Typography>
);
