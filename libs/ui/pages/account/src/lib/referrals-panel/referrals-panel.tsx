import { FavoriteBorder } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { ValentinesWorld } from '@worksheets/icons/valentines';

import { PanelFooter } from '../panel-footer';
import { PanelHeader } from '../panel-header';
import { Referral } from '../types';
import { ReferredAccountsSection } from './sections';
import { ReferredPlaysSection } from './sections/referred-plays-section';
import { ShareYourLinkSection } from './sections/share-your-link-section';

export const ReferralsPanel: React.FC<{
  referrals: Referral[];
  link: string;
  tokens: number;
  refreshTimestamp: number;
  gamesPlayed: number;
}> = ({ referrals, link, tokens, refreshTimestamp, gamesPlayed }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <PanelHeader
        primary="Referrals"
        secondary={`${referrals.length} referrals`}
        icon={<ValentinesWorld fontSize="large" />}
      />

      <Divider />

      <ReferredAccountsSection referrals={referrals} />

      <ReferredPlaysSection
        tokensEarned={gamesPlayed}
        refreshTimestamp={refreshTimestamp}
      />

      <ShareYourLinkSection
        referralLink={link}
        numReferrals={referrals.length}
        tokensEarned={tokens}
      />
      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FavoriteBorder fontSize="small" color="love" />
        <Typography>
          Help us grow by sharing your referral link with friends and family.
        </Typography>
      </Box>

      <PanelFooter learn={{ text: 'Referrals', href: '/help/referrals' }} />
    </Box>
  );
};
