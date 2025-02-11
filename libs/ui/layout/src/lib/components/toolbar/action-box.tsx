import { Box, Button } from '@mui/material';
import { contestsRoutes, playRoutes } from '@worksheets/routes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { buttonBoxShadow } from '@worksheets/ui/styles';

export const ActionBox = () => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" gap={1} alignItems="center" pb={1}>
      <Button
        href={playRoutes.category.url({
          params: {
            tagId: 'popular',
          },
        })}
        variant="arcade"
        color="error"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 170,
          ...buttonBoxShadow('error'),
        }}
      >
        Top Games
      </Button>

      <Button
        href={contestsRoutes.raffles.url()}
        variant="arcade"
        color="success"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 170,
          ...buttonBoxShadow('success'),
        }}
      >
        Giveaways
      </Button>
    </Box>
  );
};
