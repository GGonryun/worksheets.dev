import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { routes } from '@worksheets/ui/routes';
import { buttonBoxShadow } from '@worksheets/ui/styles';

export const ActionBox = () => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" gap={1} alignItems="center" pb={1}>
      <Button
        href={routes.library.url()}
        variant="arcade"
        color="primary"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 164,
          ...buttonBoxShadow('primary'),
        }}
      >
        All Games
      </Button>
      <Button
        href={routes.category.url({
          params: {
            tagId: 'popular',
          },
        })}
        variant="arcade"
        color="error"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isMedium ? 'none' : 'flex',
          width: 164,
          ...buttonBoxShadow('error'),
        }}
      >
        Top Games
      </Button>
      <Button
        href={routes.category.url({
          params: {
            tagId: 'new',
          },
        })}
        variant="arcade"
        color="error"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isSmall ? 'none' : 'flex',
          width: 164,
          ...buttonBoxShadow('error'),
        }}
      >
        New Games
      </Button>
      <Button
        href={routes.raffles.url()}
        variant="arcade"
        color="success"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 164,
          ...buttonBoxShadow('success'),
        }}
      >
        Win Prizes
      </Button>
    </Box>
  );
};
