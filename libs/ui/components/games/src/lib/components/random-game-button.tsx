import { Button } from '@mui/material';
import { ShuffleIcon } from '@worksheets/icons/native';
import { routes } from '@worksheets/routes';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { buttonBoxShadow } from '@worksheets/ui/styles';

export const RandomGameButton = () => {
  const isMobile = useMediaQueryDown('sm');

  return (
    <Button
      variant="arcade"
      color="warning"
      href={routes.play.random.path()}
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
