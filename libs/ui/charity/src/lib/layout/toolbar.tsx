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
import { FC } from 'react';
import { FillImage } from '../images/fill-image';
import { CHARITY_TOOLBAR_LOGO_PATH } from '../util';
import { DenseButton } from '@worksheets/ui/buttons';

interface ToolbarProps {
  onDrawerToggle: () => void;
  connected: boolean;
  disableLogin?: boolean;
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
          bottom: { xs: -5, sm: -11 },
          height: { xs: 6, sm: 12 },
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

        {!props.disableLogin && (
          <ConnectionButton connected={props.connected} />
        )}
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
    <Link underline="none" href="/" color="inherit">
      <Box
        sx={{
          position: 'relative',
          width: { xs: '35px', sm: '41px' },
          height: { xs: '30px', sm: '35px' },
        }}
      >
        <FillImage src={CHARITY_TOOLBAR_LOGO_PATH} alt="Charity.Games" />
      </Box>
    </Link>
    <Link underline="none" href="/" color="inherit">
      <TitleText>charity</TitleText>
      <TitleText>games</TitleText>
    </Link>
  </TitleBox>
);

const TitleBox = styled(Box)<BoxProps>(({ theme }) => ({
  userSelect: 'none',
  flexGrow: 1,
  padding: theme.spacing(0, 1),
  paddingTop: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
}));

const TitleText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.error.dark,
  fontFamily: theme.typography.corben.fontFamily,
  fontWeight: 900,
  fontSize: '0.8rem',
  lineHeight: '1rem',
  '@media (min-width: 600px)': {
    fontSize: '1rem',
    lineHeight: '1.1rem',
  },
}));
