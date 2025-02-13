import { AccountCircleOutlined, InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { ValentinesWings } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';
import { Referral, Referrer } from '@worksheets/util/types';

import { CollapsibleSection, ReferralInfo } from '../../../components';
import { ReferralsTable } from '../referral-table/referrals-table';
import { MyReferrerSection } from './my-referrer-section';

export const ReferralsSection: React.FC<{
  referrals: Referral[];
  referralLink: string;
  numReferrals: number;
  referrer: Referrer | null;
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
  onAddReferrer: (code: string) => void;
}> = ({
  active,
  onClick,
  referrals,
  referralLink,
  numReferrals,
  referrer,
  onAddReferrer,
}) => {
  return (
    <CollapsibleSection
      text="Referrals"
      description="Invite friends to join the platform"
      status={<AccountCircleOutlined fontSize="large" color="info" />}
      Icon={ValentinesWings}
      id={SettingsPanels.Referrals}
      active={active}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <ReferralInfo referrals={numReferrals} link={referralLink} />
        <Divider />
        <MyReferrerSection referrer={referrer ?? null} onAdd={onAddReferrer} />
        <Divider />
        <Typography variant="h6">My Referrals</Typography>
        <ReferralsTable referrals={referrals} />
        <Divider />
        <BulletPoints
          icon={<InfoOutlined fontSize="small" color="info" />}
          title={'How It Works'}
          points={[
            `Referrals help you earn more raffle entries and increase your chances of winning.`,
            `Users cannot remove their referral link once they've created an account.`,
            `Users can add a referral link to their account if they don't have one.`,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Referred Accounts',
            href: routes.account.path({
              bookmark: SettingsPanels.Referrals,
            }),
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};
