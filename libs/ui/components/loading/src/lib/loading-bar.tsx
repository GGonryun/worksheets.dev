import { Box, LinearProgress } from '@mui/material';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import Image from 'next/image';

export const LoadingBar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" alignItems="center" gap={0.5} flexDirection="column">
      <Image
        priority
        src="/common/charity-games/logos/square.png"
        alt="Charity Games Logo"
        width={isMobile ? 64 : 128}
        height={isMobile ? 64 : 128}
      />
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
