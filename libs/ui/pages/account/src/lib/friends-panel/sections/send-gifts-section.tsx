import { CheckCircleOutline, InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import {
  ValentinesGift,
  ValentinesMailbox,
} from '@worksheets/icons/valentines';
import { useRouter } from 'next/router';
import React from 'react';

import { useTimeUntil } from '../../__hooks__/use-time-until';
import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { MAX_DAILY_GIFT_BOX_SHARES } from '../../const';
import { PanelFooter } from '../../panel-footer';
import { RewardsTimer } from '../../rewards-timer';
import { Friend } from '../../types';
import { FriendsTable } from '../friends-table';

export const SendGiftsSection: React.FC<{
  giftsRemaining: number;
  friends: Friend[];
  refreshTimestamp: number;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
}> = (props) => {
  const { query } = useRouter();
  const { open } = query;

  const isOpen = open === 'send';

  const timeRemaining = useTimeUntil(props.refreshTimestamp);

  const addFriendsLink = '/account/friends?open=add';

  const canSendGifts = props.giftsRemaining > 0;

  return (
    <CollapsibleSection
      text="Send Gifts"
      description="Earn a gift box for every friend you send a gift to."
      Icon={ValentinesMailbox}
      open={isOpen}
      status={
        canSendGifts ? (
          <InfoOutlined fontSize="large" color="info" />
        ) : (
          <CheckCircleOutline fontSize="large" color="success" />
        )
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            mb: -1,
            gap: 1,
          }}
        >
          <Typography variant="h6">Share The Love</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <ValentinesGift />
            <Typography variant="h6">
              {props.giftsRemaining} Gifts Available
            </Typography>
          </Box>
        </Box>

        <FriendsTable
          friends={props.friends}
          canSendGifts={canSendGifts}
          onRemove={props.onRemove}
          onFavorite={props.onFavorite}
        />

        <RewardsTimer timeRemaining={timeRemaining} />

        <Divider />

        <BulletPoints
          title="How It Works"
          icon={<InfoOutlined color="info" fontSize="small" />}
          points={[
            <>
              Add friends by sharing your{' '}
              <Link href={addFriendsLink}>Friend Code</Link>.
            </>,
            `You can send a gift to ${MAX_DAILY_GIFT_BOX_SHARES} friends per day.`,
            `You earn a gift box for every friend you send a gift to.`,
            <>
              Open gift boxes on the{' '}
              <Link href="/account/tokens">Tokens Page</Link>.
            </>,
            `Your favorite friends are listed at the top of the table.`,
          ]}
        />

        <PanelFooter
          learn={{ text: 'Gift Boxes', href: '/help/gift-boxes' }}
          action={{ text: 'Add Friends', href: addFriendsLink }}
        />
      </Box>
    </CollapsibleSection>
  );
};
