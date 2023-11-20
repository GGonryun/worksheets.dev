import {
  Box,
  IconButton,
  Drawer as MuiDrawer,
  lighten,
  styled,
} from '@mui/material';
import { FC } from 'react';
import { SearchBar } from './search-bar';
import { ArrowBack } from '@mui/icons-material';
import { CategoryCarousel } from './category-carousel';
import { GameSection } from '../../games/game-section';
import { GameIcon } from '../../games/game-icon';

const drawerWidth = 700;

export type DrawerProps = { onDrawerToggle: () => void; open?: boolean };
export const Drawer: FC<DrawerProps> = ({ open, onDrawerToggle }) => (
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
      <Box ml={{ xs: -3, sm: 0 }} pr={{ xs: 0, sm: 4 }} position="relative">
        <SearchBar onLogoClick={onDrawerToggle} />
        <FloatingButton
          onClick={onDrawerToggle}
          sx={{
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <ArrowBack fontSize="large" />
        </FloatingButton>
      </Box>
      <Box pt={1}>
        <CategoryCarousel
          onClick={(category) => alert(`TODO: handle ${category} click`)}
        />
      </Box>
      <Box>
        <GameSection title="Popular this week">
          <GameIcon name="solitaire" />
        </GameSection>
        <GameSection title="Recently played">
          <GameIcon name="solitaire" />
        </GameSection>
      </Box>
    </StyledDrawer>
  </nav>
);

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    overflowY: 'visible',
    padding: theme.spacing(2),
    backgroundColor: lighten(theme.palette.error.light, 0.7),
    boxSizing: 'border-box',
    maxWidth: drawerWidth,
  },
}));

const FloatingButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.white.main,
  right: -(32 + 14),
  top: 0,
  height: 64,
  width: 64,
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
