import { PlayCircleOutline } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Row } from '@worksheets/ui/components/flex';

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
        }}
      >
        <Typography
          color="text.arcade"
          sx={{
            typography: { xs: 'body2', sm: 'body1' },
            fontWeight: { xs: 500, sm: 500 },
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
          Raffles & Giveaways
        </Typography>
        <Row
          sx={{
            mt: { xs: 2, sm: 4 },
            mb: { xs: 1, sm: 2 },
            alignSelf: 'center',
            gap: 2,
            flexWrap: 'wrap',
            '& > a': {
              width: { xs: '100%', sm: '256px' },
            },
          }}
        >
          <Button
            size="large"
            variant="arcade"
            color="success"
            startIcon={<PlayCircleOutline />}
            href={routes.help.prizes.path()}
          >
            How It Works
          </Button>
        </Row>
      </Box>
    </CustomPaper>
  );
};
