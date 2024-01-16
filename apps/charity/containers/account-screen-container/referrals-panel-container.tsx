import { ReferralsPanel } from '@worksheets/ui/pages/account';

export const ReferralsPanelContainer: React.FC = (props) => {
  return (
    <ReferralsPanel
      referrals={[]}
      link={''}
      tokens={0}
      refreshTimestamp={0}
      gamesPlayed={0}
    />
  );
};
