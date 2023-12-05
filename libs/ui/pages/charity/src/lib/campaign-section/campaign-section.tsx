import { Box } from '@mui/material';
import { FC } from 'react';
import { CharityScreenProps } from '../charity-screen';
import { CustomPaper } from '../custom-paper';
import { CampaignHeader } from './campaign-header';
import { CampaignImage } from './campaign-image';
import { CampaignPledge } from './campaign-pledge';
import { CampaignFooter } from './campaign-footer';

export const CampaignSection: FC<
  Pick<CharityScreenProps, 'charity' | 'pledge'> & { pollUrl: string }
> = ({ charity, pledge, pollUrl }) => (
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
        <CampaignPledge pledge={pledge} charity={charity} />
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
