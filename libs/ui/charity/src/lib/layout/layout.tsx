import Box from '@mui/material/Box';

import MuiToolbar from '@mui/material/Toolbar';

import { Toolbar } from './toolbar';
import { Drawer } from './drawer/drawer';
import { GameRecommendations } from './drawer/game-recommendations';
import { useState } from 'react';

type LayoutProps = {
  // TODO: add props
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Toolbar onDrawerToggle={handleDrawerToggle} connected={false} />
      <Drawer
        onDrawerToggle={handleDrawerToggle}
        open={open}
        children={<GameRecommendations />}
      />
      <Box component="main">
        <MuiToolbar />
        {children}
      </Box>
    </Box>
  );
};
