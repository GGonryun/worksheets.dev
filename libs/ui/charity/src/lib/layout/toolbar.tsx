import { AccountCircleOutlined, LockOpen, Menu } from '@mui/icons-material';
import {
  IconButton,
  Typography,
  Toolbar as MuiToolbar,
  AppBar,
  Box,
  TypographyProps,
  styled,
  BoxProps,
  Link,
} from '@mui/material';
import { DenseButton } from '../buttons';
import { FC } from 'react';
import { CHARITY_LOGO_PATH } from './util';
import { FillImage } from '../images/fill-image';
interface ToolbarProps {
  onDrawerToggle: () => void;
  connected: boolean;
}

export const Toolbar = (props: ToolbarProps) => {
  return (
    <AppBar
      component="nav"
      color="white"
      elevation={0}
      sx={{
        filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))',
        '::after': {
          content: "''",
          zIndex: 2000,
          position: 'absolute',
          backgroundColor: (theme) => theme.palette.background.paper,
          left: 0,
          right: 0,
          bottom: { xs: -6, sm: -12 },
          height: { xs: 6, sm: 12 },
          // clipPath: 'polygon(80.25% 100%, 100% 0%, 0% 0%, 16.25% 100%, 64% 0%)',
          // clipPath: 'polygon(83% 100%, 100% 0%, 0% 0%, 19.25% 100%, 50% 0%)',
          clipPath:
            'polygon(89.25% 100%, 100% 0%, 0% 0%, 8.99% 100%, 31.73% 0%, 50.86% 78.48%, 68.98% 0%)',
          filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
        },
      }}
    >
      <MuiToolbar variant="dense">
        <IconButton
          color="black"
          aria-label="open drawer"
          edge="start"
          size="small"
          onClick={props.onDrawerToggle}
        >
          <Menu
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          />
        </IconButton>
        <LogoBox />

        <ConnectionButton connected={props.connected} />
      </MuiToolbar>
    </AppBar>
  );
};

const ConnectionButton: FC<{ connected: boolean }> = ({ connected }) => {
  if (connected) {
    return (
      <DenseButton startIcon={<AccountCircleOutlined />} color="error">
        Account
      </DenseButton>
    );
  }
  return (
    <DenseButton startIcon={<LockOpen />} color="error" variant="outlined">
      Log In
    </DenseButton>
  );
};

const LogoBox = () => (
  <TitleBox>
    <Link
      underline="none"
      href="/"
      color="inherit"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '35px', sm: '41px' },
          height: { xs: '30px', sm: '35px' },
        }}
      >
        <FillImage src={CHARITY_LOGO_PATH} alt="Charity.Games" />
      </Box>
      <Box pb={'2px'}>
        <TitleText>charity</TitleText>
        <TitleText>games</TitleText>
      </Box>
    </Link>
  </TitleBox>
);

const TitleBox = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(0, 1),
  paddingTop: theme.spacing(0.5),
}));

const TitleText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.error.dark,
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  fontSize: '0.8rem',
  lineHeight: '1rem',
  '@media (min-width: 600px)': {
    fontSize: '1rem',
    lineHeight: '1.1rem',
  },
}));
