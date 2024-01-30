import { ArrowBack } from '@mui/icons-material';
import { Button, ButtonProps, styled } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { TopEdgeBlur } from '@worksheets/ui/components/carousel';
import { FC, JSXElementConstructor, ReactNode } from 'react';

import { SearchBar } from './search-bar';

const drawerWidth = 700;

export type DrawerProps = {
  onDrawerToggle: () => void;
  onChange?: (query: string) => void;
  onClear?: () => void;
  query?: string;
  open?: boolean;
  children?: ReactNode;
  contentRef?: React.RefObject<HTMLDivElement>;
};
export const Drawer: FC<DrawerProps> = ({
  open,
  onDrawerToggle,
  children,
  onChange,
  onClear,
  query,
  contentRef,
}) => {
  return (
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
            borderRadius: 0,
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
        <Box
          px={{ xs: 1, sm: 2 }}
          pt={2}
          pb={3}
          overflow={'auto'}
          ref={contentRef}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </Box>
      </StyledDrawer>
    </nav>
  );
};

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    overflowY: 'visible',
    backgroundColor: theme.palette.background['solid-blue'],
    boxSizing: 'border-box',
    maxWidth: drawerWidth,
  },
}));

const FloatingButton = styled<JSXElementConstructor<ButtonProps>>((props) => (
  <Button variant="square" color="error" {...props} />
))(({ theme }) => ({
  position: 'absolute',
  right: -32,
  top: 0,
  height: 64,
  width: 64,
  zIndex: 100,
  transition: theme.transitions.create(['top', 'box-shadow'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shortest,
  }),
}));
