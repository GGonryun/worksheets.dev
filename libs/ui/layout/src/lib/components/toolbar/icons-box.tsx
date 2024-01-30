import { AccountCircle, Login, Menu } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';

export const IconsBox: React.FC<{
  connected: boolean;
  onMenuClick: () => void;
}> = (props) => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <Box display="flex" gap={1} pb={1}>
      <Button
        href="/login"
        variant="square"
        color="primary"
        size={isMedium ? 'small' : 'medium'}
      >
        {props.connected ? (
          <AccountCircle fontSize="small" />
        ) : (
          <Login fontSize="small" />
        )}
      </Button>
      <Button
        variant="square"
        color="primary"
        size={isMedium ? 'small' : 'medium'}
        onClick={props.onMenuClick}
      >
        <Menu fontSize="small" />
      </Button>
    </Box>
  );
};
