import { HowToVote, PlayCircleOutline } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { PrizesGroup } from '@worksheets/ui/components/prizes';
import { PrizeSchema } from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';

export const PrizesScreen: React.FC<{ prizes: PrizeSchema[] }> = ({
  prizes,
}) => (
  <CustomContainer>
    <Typography>The Prize Wall</Typography>
    <Typography typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}>
      Play Games & Win Prizes
    </Typography>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={2}
      py={3}
    >
      <Button
        href="/raffles"
        variant="arcade"
        size="large"
        color="secondary"
        startIcon={<HowToVote />}
        sx={{
          width: { xs: '100%', sm: '256px' },
        }}
      >
        Enter Raffles
      </Button>
      <Button
        href="/help/prizes"
        variant="arcade"
        size="large"
        color="success"
        startIcon={<PlayCircleOutline />}
        sx={{
          width: { xs: '100%', sm: '256px' },
        }}
      >
        How It Works
      </Button>
    </Box>
    <PrizesGroup title={'All Prizes'} prizes={prizes} />
  </CustomContainer>
);
