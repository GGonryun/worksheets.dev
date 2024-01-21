import { PlayCircleOutlined } from '@mui/icons-material';
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';

import { CustomPaper } from '../shared/custom-paper';

export const TitleText = () => {
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
          Charity Games Prize Wall
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
        <Button
          variant="arcade"
          color="success"
          size={
            useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
              ? 'small'
              : 'medium'
          }
          sx={{
            mt: 3,
          }}
          startIcon={
            <PlayCircleOutlined
              color="white"
              sx={{
                height: { xs: '1.5rem', sm: '2.5rem' },
                width: { xs: '1.5rem', sm: '2.5rem' },
              }}
            />
          }
        >
          How It Works
        </Button>
      </Box>
    </CustomPaper>
  );
};
