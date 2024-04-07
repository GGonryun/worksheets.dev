import { Box, LinearProgress } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';

export const LoadingBar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" alignItems="center" gap={0.5} flexDirection="column">
      <CharityGamesLogo size={isMobile ? 64 : 128} />
      <LinearProgress
        color="secondary"
        sx={{
          mb: 4,
          width: '100%',
          height: isMobile ? 6 : 12,
          borderRadius: 6,
        }}
      />
    </Box>
  );
};
