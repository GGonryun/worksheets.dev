import { AccountCircleOutlined, LinkOutlined } from '@mui/icons-material';
import { ValentinesWings, ValentinesWorld } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { ReferralsPanels } from '@worksheets/util/enums';
import { Referral } from '@worksheets/util/types';

import { CollapsibleSection } from '../../components';
import { ReferredAccountsSection, ShareYourLinkSection } from './sections';

export const ReferralsPanel: React.FC<{
  bookmark?: ReferralsPanels;
  referrals: Referral[];
  link: string;
}> = ({ referrals, link, bookmark }) => {
  return (
    <Panel
      bookmark={bookmark}
      header={{
        primary: 'Referrals',
        secondary: `${referrals.length} referrals`,
        icon: <ValentinesWorld fontSize="large" />,
      }}
      note={{
        content:
          'Help us grow by sharing your referral link with friends and family.',
      }}
      footer={{
        learn: { text: 'Referrals', href: routes.help.referrals.path() },
      }}
      sections={(active, toggle) => (
        <>
          <CollapsibleSection
            text="Referred Accounts"
            description="Earn tokens whenever someone makes an account using your referral link."
            status={<AccountCircleOutlined fontSize="large" color="info" />}
            Icon={ValentinesWings}
            id={ReferralsPanels.ReferredAccounts}
            active={active}
            onClick={toggle}
          >
            <ReferredAccountsSection referrals={referrals} />
          </CollapsibleSection>

          <CollapsibleSection
            id={ReferralsPanels.ShareYourLink}
            text="Share Your Link"
            description="Get a copy of your link and share it with friends or on social media."
            active={active}
            onClick={toggle}
            status={<LinkOutlined fontSize="large" color="info" />}
            Icon={ValentinesWorld}
          >
            <ShareYourLinkSection
              referralLink={link}
              numReferrals={referrals.length}
            />
          </CollapsibleSection>
        </>
      )}
    />
  );
};
