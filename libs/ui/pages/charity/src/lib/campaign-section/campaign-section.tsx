import { Box, Divider } from '@mui/material';
import { GamePopularityStatistics } from '@worksheets/util/types';
import { FC } from 'react';

import { CharityScreenProps } from '../charity-screen';
import { CustomPaper } from '../custom-paper';
import { CampaignFooter } from './campaign-footer';
import { CampaignHeader } from './campaign-header';
import { CampaignImage } from './campaign-image';
import { CampaignPledge } from './campaign-pledge';

export const CampaignSection: FC<
  Pick<CharityScreenProps, 'charity' | 'pledge'> & {
    pollUrl: string;
    statistics?: GamePopularityStatistics;
  }
> = ({ charity, pledge, pollUrl, statistics }) => (
  <Box>
    <CustomPaper
      elevation={0}
      sx={{
        p: 0,
        m: 0,
        alignItems: 'center',
      }}
    >
      <Box p={4}>
        <CampaignHeader caption={charity.caption} />
        <Box
          sx={{
            mt: 2,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <CampaignImage charity={charity} />
          <CampaignPledge
            pledge={pledge}
            charity={charity}
            statistics={statistics}
          />
        </Box>
      </Box>
      <Divider color="white" sx={{ width: '100%' }} />
      <Box p={4}>
        <CampaignFooter pollUrl={pollUrl} />
      </Box>
    </CustomPaper>
  </Box>
);
