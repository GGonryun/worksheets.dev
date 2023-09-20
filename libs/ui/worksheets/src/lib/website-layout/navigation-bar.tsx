import { Divider, IconButton, Theme, Toolbar, styled } from '@mui/material';
import {
  AccountMenu,
  MarketingHeader,
  urls,
  useLayout,
} from '@worksheets/ui/common';
import { Flex } from '@worksheets/ui-core';

import { HelpOutline, Menu, MoreVert } from '@mui/icons-material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { FC } from 'react';
import { ProjectSelector } from '@worksheets/ui-projects';
import { drawerWidth } from './constants';

export type NavBarProps = {
  open: boolean;
  secure?: boolean;
  onOpen: () => void;
};

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  withDrawer?: boolean;
}

export const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'private' && prop !== 'withDrawer',
})<AppBarProps>(({ theme, open, withDrawer }) => ({
  ...(withDrawer && {
    width: `calc(100% - ${theme.spacing(7)} + 1px)`,
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(['width', 'margin', 'box-shadow'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxSizing: 'border-box',
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin', 'box-shadow'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    // if we're mobile, the width takes up 100% of the screen
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  }),
}));

export const NavigationBar: React.FC<NavBarProps> = ({ open, onOpen }) => {
  const { scroll, theme, isMobile } = useLayout();

  const hasProject = true;

  return (
    <CustomAppBar
      withDrawer={hasProject}
      position="fixed"
      open={open}
      color="inherit"
      elevation={scroll > 10 ? 4 : 0}
    >
      <Toolbar variant="dense" disableGutters>
        <Flex spaceBetween fullWidth px={2}>
          <LeftSide
            onOpen={onOpen}
            isMobile={isMobile}
            hasProject={hasProject}
          />
          <RightSide isMobile={isMobile} theme={theme} />
        </Flex>
      </Toolbar>
      <Divider />
    </CustomAppBar>
  );
};

const LeftSide: FC<{
  isMobile?: boolean;
  hasProject?: boolean;
  onOpen: () => void;
}> = ({ hasProject, isMobile, onOpen }) => {
  return hasProject ? (
    isMobile ? (
      <IconButton color="inherit" size="small" onClick={() => onOpen()}>
        <Menu />
      </IconButton>
    ) : (
      <ProjectSelector variant="text" />
    )
  ) : (
    <Flex gap={3}>
      <MarketingHeader />
    </Flex>
  );
};

const RightSide: FC<{
  theme: Theme;
  isMobile?: boolean;
}> = ({ isMobile, theme }) => (
  <Flex gap={1}>
    <IconButton
      color="inherit"
      size="small"
      sx={{
        '&:hover': {
          color: theme.palette.primary.main,
        },
      }}
      href={urls.app.contact}
    >
      <HelpOutline />
    </IconButton>
    {isMobile && (
      <IconButton
        color="inherit"
        size="small"
        sx={{
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }}
      >
        <MoreVert />
      </IconButton>
    )}
    <AccountMenu />
  </Flex>
);
