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
} from '@mui/material';
import Image from 'next/image';
import { DenseButton } from '../buttons';
import { FC } from 'react';
import { CHARITY_LOGO_PATH } from './util';
interface ToolbarProps {
  onDrawerToggle: () => void;
  connected: boolean;
}

export const Toolbar = (props: ToolbarProps) => {
  return (
    <AppBar component="nav" color="white">
      <MuiToolbar>
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
    <Image src={CHARITY_LOGO_PATH} alt="Charity.Games" width={41} height={35} />
    <Box pb={'2px'}>
      <TitleText>charity</TitleText>
      <TitleText>games</TitleText>
    </Box>
  </TitleBox>
);

const TitleBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
  flexGrow: 1,
  padding: theme.spacing(0, 1),
}));

const TitleText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.error.dark,
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  fontSize: '0.8rem',
  lineHeight: '1rem',
  '@media (min-width: 600px)': {
    fontSize: '1rem',
    lineHeight: '1.2rem',
  },
}));
