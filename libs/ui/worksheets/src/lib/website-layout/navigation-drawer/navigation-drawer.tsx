import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FC, useState } from 'react';
import {
  Apps,
  Article,
  ChevronLeft,
  ChevronRight,
  HistoryEdu,
  Home,
  Hub,
  NotificationAddOutlined,
  OpenInNew,
  Schema,
  Star,
  TrendingUp,
  VpnKey,
  Work,
} from '@mui/icons-material';
import { drawerWidth } from '../constants';
import { NavigationDrawerItems } from './navigation-drawer-items';
import { ProjectSettingsButton } from './project-settings-button';
import { ProjectSettingsMenu } from './project-settings-menu';
import { MarketingHeader, useLayout, useUser } from '@worksheets/ui/common';
import { useProjectUrls } from '@worksheets/ui-projects';

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
});

const CustomDrawer = styled(
  MuiDrawer,
  {}
)(({ theme, open }) => ({
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

export const NavigationDrawer: FC<{
  open?: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const { user } = useUser();
  const { isMobile } = useLayout();
  const urls = useProjectUrls();

  const [projectSettingsMenuAnchor, setProjectSettingsMenuAnchor] = useState<
    undefined | HTMLElement
  >();

  if (!user) {
    return null;
  }

  return (
    <>
      <CustomDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ disableScrollLock: true }}
      >
        <MarketingHeader />
        <Divider />
        <NavigationDrawerItems
          thin={!open}
          strict
          items={[
            {
              icon: <Home fontSize="small" />,
              text: 'Overview',
              href: urls.app.project.overview,
              endIcon: (
                <ProjectSettingsButton
                  onClick={(e) => {
                    setProjectSettingsMenuAnchor(e.currentTarget);
                  }}
                />
              ),
            },
          ]}
        />
        <Divider />
        <NavigationDrawerItems
          thin={!open}
          title="All Features"
          items={[
            {
              text: 'Connections',
              href: urls.app.project.connections,
              icon: <Hub fontSize="small" />,
            },
            {
              text: 'Services',
              href: urls.app.project.services,
              icon: <Work fontSize="small" />,
            },
            {
              text: 'Vault',
              href: urls.app.project.vault,
              icon: <VpnKey fontSize="small" />,
            },
            {
              text: 'Analytics',
              href: urls.app.project.analytics,
              icon: <TrendingUp fontSize="small" />,
            },
            {
              text: 'Schemas',
              href: urls.app.project.schemas,
              icon: <Schema fontSize="small" />,
            },
            {
              text: 'Tasks',
              href: urls.app.project.tasks,
              icon: <HistoryEdu fontSize="small" />,
            },
            {
              text: 'Events',
              href: urls.app.project.events,
              icon: <NotificationAddOutlined fontSize="small" />,
            },
          ]}
        />
        <Divider />
        <NavigationDrawerItems
          thin={!open}
          title="Resources"
          items={[
            {
              text: 'Features',
              href: urls.app.features,
              icon: <Star fontSize="small" />,
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
              endIcon: <OpenInNew fontSize="small" />,
            },
          ]}
        />
        <Divider />

        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                display: 'flex',
                justifyContent: 'end',
              }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                {open ? <ChevronLeft /> : <ChevronRight />}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </CustomDrawer>
      <ProjectSettingsMenu
        anchor={projectSettingsMenuAnchor}
        onClose={() => setProjectSettingsMenuAnchor(undefined)}
      />
    </>
  );
};
