import { Box, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import dynamic from 'next/dynamic';
import React from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { DataGroup } from '../../shared/data-group';
import { DataPair } from '../../shared/data-pair';
import { ListButton } from '../../shared/list-button';

const AdminUserScreen: React.FC<{ userId: string }> = ({ userId }) => {
  const user = trpc.admin.users.find.useQuery({ userId });

  if (user.isLoading) return <LoadingScreen />;
  if (user.error) return <ErrorScreen message={user.error.message} />;

  return (
    <CustomContainer>
      <ListButton href="/admin/users">All Users</ListButton>
      <CustomPaper title={`User Details`}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Information
          </Typography>

          <DataPair label="Type" value={user.data.type} />
          <DataPair label="User ID" value={user.data.userId} />
          <DataPair label="Username" value={user.data.username} />
          <DataPair label="Email" value={user.data.email} />
          <DataPair
            label="Created At"
            value={printShortDateTime(user.data.createdAt)}
          />
          <DataPair
            label="Is Publisher"
            value={user.data.isPublisher.toString()}
          />
          <DataPair
            label="# of Notifications"
            value={user.data.notifications.toString()}
          />
          <DataPair
            label="Referred By"
            value={user.data.referrerId?.toString() ?? 'N/A'}
          />
          <DataPair label="Referral Code" value={user.data.referralCode} />

          <br />
          <Typography variant="h5" gutterBottom>
            Rewards
          </Typography>
          <DataPair
            label="Last Updated At"
            value={printShortDateTime(user.data.rewards.updatedAt)}
          />
          <DataPair label="# of Tokens" value={user.data.rewards.totalTokens} />
          <DataPair
            label="# of Gift Boxes"
            value={user.data.rewards.giftBoxes}
          />

          <DataGroup
            label="Raffle Participation"
            items={user.data.participation}
            builder={(participation) => ({
              key: participation.raffleId.toString(),
              label: 'Raffle ID',
              value: `${participation.raffleId} (${participation.numTickets} tickets)`,
              href: `/admin/raffles/${participation.raffleId}`,
            })}
          />

          <DataGroup
            label="Raffle Winnings"
            items={user.data.winnings}
            builder={(winning) => ({
              key: winning.winnerId,
              label: 'Winner ID',
              value: winning.winnerId,
              href: `/admin/winner/${winning.winnerId}`,
            })}
          />

          <DataGroup
            label="Friends"
            items={user.data.friends}
            builder={(friend) => ({
              key: friend.userId,
              label: 'User ID',
              value: friend.userId,
              href: `/admin/users/${friend.userId}`,
            })}
          />

          <DataGroup
            label="Followers"
            items={user.data.followers}
            builder={(follower) => ({
              key: follower.userId,
              label: 'User ID',
              value: follower.userId,
              href: `/admin/users/${follower.userId}`,
            })}
          />

          <DataGroup
            label="Referrals"
            items={user.data.referrals}
            builder={(referral) => ({
              key: referral.userId,
              label: 'User ID',
              value: referral.userId,
              href: `/admin/users/${referral.userId}`,
            })}
          />

          <DataGroup
            label="Game Submissions"
            items={user.data.submissions}
            builder={(submission) => ({
              key: submission.submissionId,
              label: 'Submission ID',
              value: submission.submissionId,
              href: `/admin/submissions/${submission.submissionId}`,
            })}
          />
        </Box>
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminUserScreen = dynamic(
  () => Promise.resolve(AdminUserScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
