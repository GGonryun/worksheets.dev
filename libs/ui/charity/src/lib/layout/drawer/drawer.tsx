import {
  Box,
  IconButton,
  Drawer as MuiDrawer,
  lighten,
  styled,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { SearchBar } from './search-bar';
import { ArrowBack } from '@mui/icons-material';
import { TopEdgeBlur } from './edge-blur';

const drawerWidth = 700;

export type DrawerProps = {
  onDrawerToggle: () => void;
  onChange?: (query: string) => void;
  onClear?: () => void;
  query?: string;
  open?: boolean;
  children?: ReactNode;
};
export const Drawer: FC<DrawerProps> = ({
  open,
  onDrawerToggle,
  children,
  onChange,
  onClear,
  query,
}) => (
  <nav>
    <StyledDrawer
      variant="temporary"
      open={open}
      onClose={onDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '80%' },
        },
      }}
    >
      <Box
        ml={{ xs: -3, sm: 0 }}
        mt={2}
        pl={2}
        pr={{ xs: 1, sm: 6 }}
        position="relative"
      >
        <SearchBar
          onLogoClick={onDrawerToggle}
          onChange={onChange}
          onClear={onClear}
          value={query}
        />
        <FloatingButton
          onClick={onDrawerToggle}
          sx={{
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <ArrowBack fontSize="large" />
        </FloatingButton>
        <TopEdgeBlur />
      </Box>
      <Box px={{ xs: 1, sm: 2 }} pt={2} pb={1} overflow={'auto'}>
        {children}
      </Box>
    </StyledDrawer>
  </nav>
);

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    overflowY: 'visible',
    backgroundColor: lighten(theme.palette.error.light, 0.7),
    boxSizing: 'border-box',
    maxWidth: drawerWidth,
  },
}));

const FloatingButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.white.main,
  right: -32,
  top: 0,
  height: 64,
  width: 64,
  zIndex: 100,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['top', 'box-shadow'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    top: -4,
    backgroundColor: theme.palette.white.main,
    boxShadow: theme.shadows[6],
  },
}));
