import Box from '@mui/material/Box';

import MuiToolbar from '@mui/material/Toolbar';

import { Toolbar } from './toolbar';
import { Drawer } from './drawer/drawer';
import { GameRecommendations } from './drawer/game-recommendations';
import { useState } from 'react';
import { lighten } from '@mui/system';
import { WebsiteFooter } from './footer';

type LayoutProps = {
  children: React.ReactNode;
  connected?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({ children, connected }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: (theme) => lighten(theme.palette.error.light, 0.7),
      }}
    >
      <Toolbar
        disableLogin
        onDrawerToggle={handleDrawerToggle}
        connected={connected ?? false}
      />
      <Drawer
        onDrawerToggle={handleDrawerToggle}
        open={open}
        children={<GameRecommendations />}
      />
      <Box flexGrow={1} pb={2}>
        <MuiToolbar />
        {children}
      </Box>
      <WebsiteFooter />
    </Box>
  );
};
