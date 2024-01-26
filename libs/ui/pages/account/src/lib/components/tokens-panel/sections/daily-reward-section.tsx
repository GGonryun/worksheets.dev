import {
  AccessTime,
  AccessTimeOutlined,
  CheckCircleOutline,
  InfoOutlined,
} from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { ValentinesMail } from '@worksheets/icons/valentines';
import { TokensPanels } from '@worksheets/util/enums';
import { BASE_DAILY_REWARD } from '@worksheets/util/settings';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { PanelFooter } from '../../panel-footer';

export const DailyRewardSection: React.FC<{
  claimed: boolean;
  timeRemaining: string;
  onClaim: () => void;
  id: TokensPanels;
  active: TokensPanels | undefined;
  onClick: (id: string) => void;
}> = ({ claimed, timeRemaining, onClaim, id, active, onClick }) => {
  const isComplete = claimed;

  return (
    <CollapsibleSection
      id={id}
      active={active}
      onClick={onClick}
      text="Daily Reward"
      description="Get extra tokens every time you claim the daily reward."
      Icon={ValentinesMail}
      status={
        isComplete ? (
          <CheckCircleOutline fontSize="large" color="success" />
        ) : (
          <AccessTimeOutlined fontSize="large" color="info" />
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
        <Typography
          variant="h5"
          textAlign="center"
          color={isComplete ? 'success.main' : 'primary.main'}
        >
          {isComplete ? 'Come Back Later' : 'Daily Reward Available'}!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {isComplete ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <AccessTime
                fontSize="small"
                sx={{ mt: '-2px' }}
                color="success"
              />
              <Typography
                variant="body3"
                textAlign="center"
                color="success.main"
              >
                Next Daily Reward in {timeRemaining}
              </Typography>
              <AccessTime
                fontSize="small"
                sx={{ mt: '-2px' }}
                color="success"
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <AccessTime fontSize="small" sx={{ mt: '-2px' }} color="error" />
              <Typography variant="body3" textAlign="center">
                Your reward expires in {timeRemaining}
              </Typography>
              <AccessTime fontSize="small" sx={{ mt: '-2px' }} color="error" />
            </Box>
          )}

          <Button
            fullWidth
            variant="arcade"
            size="large"
            color="primary"
            disabled={isComplete}
            startIcon={isComplete ? <AccessTime /> : undefined}
            onClick={onClaim}
          >
            {isComplete ? timeRemaining : `Claim ${BASE_DAILY_REWARD} Tokens`}
          </Button>

          <Typography
            variant="body3"
            textAlign="center"
            color={isComplete ? 'success.main' : 'text.primary'}
          >
            {isComplete
              ? 'You have claimed your daily reward'
              : 'Click to earn your daily reward'}
          </Typography>
        </Box>

        <BulletPoints
          title="How It Works"
          icon={<InfoOutlined fontSize="small" color="info" />}
          points={[
            'Rewards are available every 24 hours and reset at 12:00 AM UTC.',
            `Each daily reward is worth ${BASE_DAILY_REWARD} tokens.`,
            `If you miss a claim, you won't be able to claim the reward.`,
            <>
              <Link href="/help/vip">VIP members</Link> earn x3 the daily
              reward.
            </>,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Daily Rewards',
            href: '/help/tokens-rewards#daily-rewards',
          }}
          action={{
            text: 'Play Games',
            href: '/play',
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};
