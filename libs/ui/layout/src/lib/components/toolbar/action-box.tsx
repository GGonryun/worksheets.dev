import { Box, Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { buttonBoxShadow } from '@worksheets/ui/styles';

export const ActionBox = () => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" gap={1} alignItems="center" pb={1}>
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
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 170,
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
          display: isMedium ? 'none' : 'flex',
          width: 170,
          ...buttonBoxShadow('error'),
        }}
      >
        New Games{' '}
      </Button>
      <Button
        href={routes.battles.url()}
        variant="arcade"
        color="primary"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isSmall ? 'none' : 'flex',
          width: 170,
          ...buttonBoxShadow('primary'),
        }}
      >
        Boss Battles
      </Button>
      <Button
        href={routes.raffles.url()}
        variant="arcade"
        color="success"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 170,
          ...buttonBoxShadow('success'),
        }}
      >
        Win Prizes
      </Button>
    </Box>
  );
};
