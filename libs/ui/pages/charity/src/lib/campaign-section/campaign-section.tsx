import { Box } from '@mui/material';
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
      sx={{
        alignItems: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <CampaignHeader caption={charity.caption} />
      <Box
        sx={{
          mt: 1,
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
    </CustomPaper>
    <CustomPaper
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.grey[100],
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <CampaignFooter pollUrl={pollUrl} />
    </CustomPaper>
  </Box>
);
