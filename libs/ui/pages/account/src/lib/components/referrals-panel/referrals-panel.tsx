import {
  AccountCircleOutlined,
  CheckCircleOutline,
  FavoriteBorder,
  LinkOutlined,
  PendingOutlined,
} from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import {
  ValentinesTicket,
  ValentinesWings,
  ValentinesWorld,
} from '@worksheets/icons/valentines';
import { ReferralsPanels } from '@worksheets/util/enums';
import { MAX_TOKENS_FROM_REFERRAL_PLAYS } from '@worksheets/util/settings';
import { Referral } from '@worksheets/util/types';

import { CollapsibleSection } from '../collapsible-section';
import { usePanelController } from '../hooks/use-panel-controller';
import { PanelFooter } from '../panel-footer';
import { PanelHeader } from '../panel-header';
import { ReferredAccountsSection } from './sections';
import { ReferredPlaysSection } from './sections/referred-plays-section';
import { ShareYourLinkSection } from './sections/share-your-link-section';

export const ReferralsPanel: React.FC<{
  bookmark?: ReferralsPanels;
  referrals: Referral[];
  link: string;
  refreshTimestamp: number;
  gamesPlayed: number;
}> = ({ referrals, link, refreshTimestamp, gamesPlayed, bookmark }) => {
  const { active, toggleActive } = usePanelController(bookmark);

  const maxTokensEarned = gamesPlayed >= MAX_TOKENS_FROM_REFERRAL_PLAYS;

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

      <CollapsibleSection
        text="Referred Accounts"
        description="Earn tokens whenever someone makes an account using your referral link."
        status={<AccountCircleOutlined fontSize="large" color="info" />}
        Icon={ValentinesWings}
        id={ReferralsPanels.ReferredAccounts}
        active={active}
        onClick={toggleActive}
      >
        <ReferredAccountsSection referrals={referrals} />
      </CollapsibleSection>

      <CollapsibleSection
        id={ReferralsPanels.ReferredPlays}
        text="Games Played"
        description="Get extra tokens when someone plays a game using your referral link."
        active={active}
        onClick={toggleActive}
        status={
          maxTokensEarned ? (
            <CheckCircleOutline fontSize="large" color="success" />
          ) : (
            <PendingOutlined fontSize="large" color="info" />
          )
        }
        Icon={ValentinesTicket}
      >
        <ReferredPlaysSection
          isMax={maxTokensEarned}
          tokensEarned={gamesPlayed}
          refreshTimestamp={refreshTimestamp}
        />
      </CollapsibleSection>

      <CollapsibleSection
        id={ReferralsPanels.ShareYourLink}
        text="Share Your Link"
        description="Get a copy of your link and share it with friends or on social media."
        active={active}
        onClick={toggleActive}
        status={<LinkOutlined fontSize="large" color="info" />}
        Icon={ValentinesWorld}
      >
        <ShareYourLinkSection
          referralLink={link}
          numReferrals={referrals.length}
        />
      </CollapsibleSection>
      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FavoriteBorder fontSize="small" color="secondary" />
        <Typography>
          Help us grow by sharing your referral link with friends and family.
        </Typography>
      </Box>

      <PanelFooter learn={{ text: 'Referrals', href: '/help/referrals' }} />
    </Box>
  );
};
