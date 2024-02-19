import { Button } from '@mui/material';
import { ShuffleIcon } from '@worksheets/icons/native';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { routes } from '@worksheets/ui/routes';
import { buttonBoxShadow } from '@worksheets/ui/styles';

export const RandomGameButton = () => {
  const isMobile = useMediaQueryDown('sm');

  return (
    <Button
      variant="arcade"
      color="warning"
      href={routes.games.random.path()}
      size={isMobile ? 'medium' : 'large'}
      fullWidth
      startIcon={<ShuffleIcon size={isMobile ? 18 : 23} />}
      sx={{
        py: { xs: 1, sm: 2 },
        ...buttonBoxShadow('warning'),
      }}
    >
      Play Random Game
    </Button>
  );
};
