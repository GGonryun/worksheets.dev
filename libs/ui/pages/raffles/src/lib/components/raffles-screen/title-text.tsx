import { CardGiftcard, PlayCircleOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';

import { CustomPaper } from '../shared/custom-paper';

export const TitleText = () => {
  const isMobile = useMediaQueryDown('sm');
  return (
    <CustomPaper
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        width: 'fit-content',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 0.875,
        }}
      >
        <Typography
          color="text.arcade"
          sx={{
            typography: { xs: 'body3', sm: 'body1' },
          }}
        >
          Charity Games Raffles
        </Typography>
        <Typography
          component="h1"
          color="text.arcade"
          textAlign="center"
          sx={{
            typography: { xs: 'h4', sm: 'h3', md: 'h2' },
          }}
        >
          Enter Raffles & Win Prizes
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="center"
          mt={4}
          mb={2}
          gap={2}
          width="100%"
        >
          <Button
            href="/prizes"
            variant="arcade"
            color="warning"
            size={isMobile ? 'medium' : 'large'}
            sx={{
              width: { xs: '100%', sm: '256px' },
            }}
            startIcon={<CardGiftcard color="white" />}
          >
            View Prizes
          </Button>
          <Button
            href="/help/raffles"
            variant="arcade"
            color="success"
            size={isMobile ? 'medium' : 'large'}
            sx={{
              width: { xs: '100%', sm: '256px' },
            }}
            startIcon={<PlayCircleOutlined color="white" />}
          >
            How It Works
          </Button>
        </Box>
      </Box>
    </CustomPaper>
  );
};
