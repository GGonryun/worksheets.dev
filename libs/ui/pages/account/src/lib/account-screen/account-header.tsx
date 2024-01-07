import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoutIcon from '@mui/icons-material/Logout';
import { FC } from 'react';

export const AccountHeader: FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        px: isMobile ? 2 : 4,
        py: isMobile ? 1.5 : 3,
      }}
    >
      <Typography variant={isMobile ? 'h4' : 'h3'}>Account</Typography>
      <Button
        variant="contained"
        size={isMobile ? 'small' : 'medium'}
        color="error"
        endIcon={<LogoutIcon />}
        onClick={onLogout}
        sx={{
          fontFamily: 'Dangrek',
          px: isMobile ? 2 : 3,
          borderRadius: 6,
        }}
      >
        Log Out
      </Button>
    </Box>
  );
};
