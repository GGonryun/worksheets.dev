import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';

export const ActionBox = () => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" gap={1} alignItems="center" pb={1}>
      <Button
        href="/tags/popular"
        variant="arcade"
        color="primary"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 164,
        }}
      >
        Top Games
      </Button>
      <Button
        href="/tags/ad-free"
        variant="arcade"
        color="error"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isMedium ? 'none' : 'flex',
          width: 164,
        }}
      >
        Free Games
      </Button>
      <Button
        href="/tags/new"
        variant="arcade"
        color="error"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isSmall ? 'none' : 'flex',
          width: 164,
        }}
      >
        New Games
      </Button>
      <Button
        href="/prizes"
        variant="arcade"
        color="success"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 164,
        }}
      >
        All Raffles
      </Button>
    </Box>
  );
};
