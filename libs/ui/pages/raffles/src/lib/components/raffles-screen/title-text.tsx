import { CardGiftcardOutlined, PlayCircleOutline } from '@mui/icons-material';
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
          <Button
            size="large"
            variant="arcade"
            color="secondary"
            startIcon={<CardGiftcardOutlined />}
            href={routes.prizes.path()}
          >
            Prize Wall
          </Button>
        </Row>
      </Box>
    </CustomPaper>
  );
};
