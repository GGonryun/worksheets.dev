import { OpenInNew } from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { ReferralsPanels } from '@worksheets/util/enums';
import { ReferralPlayMinutesQuest } from '@worksheets/util/types';
import pluralize from 'pluralize';

const SHARE_YOUR_LINK = routes.account.referrals.path({
  bookmark: ReferralsPanels.ShareYourLink,
});
export const ReferralPlayMinutesQuestForm: React.FC<{
  quest: ReferralPlayMinutesQuest;
}> = ({ quest }) => {
  const minutes = Math.floor(quest.state.duration / 60);

  return (
    <Column gap={2}>
      <BulletPoints
        title={'How It Works'}
        points={[
          <>
            <Link href={SHARE_YOUR_LINK}>Share your referral link</Link> to
            qualify for this quest.
          </>,
          `Anyone who signs up with your link and plays a game will contribute towards this quest.`,
          `Players must remain active on the page for at least 1 minute to contribute towards this quest.`,
          <>
            <Link href={routes.vip.path()}>VIP members</Link> earn 2x the
            tokens!
          </>,
        ]}
      />
      <Typography textAlign="center" fontWeight={700} variant="body2">
        Your referrals have played for {minutes} {pluralize('minute', minutes)}.
      </Typography>
      <Button
        variant="arcade"
        href={SHARE_YOUR_LINK}
        startIcon={<OpenInNew />}
        target="_blank"
      >
        Your Referrals
      </Button>
    </Column>
  );
};
