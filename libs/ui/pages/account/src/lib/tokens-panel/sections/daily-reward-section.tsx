import {
  AccessTime,
  AccessTimeOutlined,
  CardGiftcardOutlined,
  CheckCircleOutline,
  InfoOutlined,
  LocalFireDepartment,
} from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { ValentinesMail, ValentinesTicket } from '@worksheets/icons/valentines';
import React from 'react';

import { BulletPoints, TitleText } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import {
  BASE_DAILY_REWARD,
  MAX_MOMENTUM,
  MOMENTUM_MULTIPLIER,
} from '../../const';
import { PanelFooter } from '../../panel-footer';

export const DailyRewardSection: React.FC<{
  claimed: boolean;
  momentum: number;
  timeRemaining: string;
  onClaim: () => void;
}> = ({ claimed, momentum, timeRemaining, onClaim }) => {
  const isComplete = claimed;

  return (
    <CollapsibleSection
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
            variant="round"
            size="large"
            color="primary"
            disabled={isComplete}
            startIcon={isComplete ? <AccessTime /> : <CardGiftcardOutlined />}
            onClick={onClaim}
          >
            {isComplete
              ? timeRemaining
              : `Claim ${BASE_DAILY_REWARD * momentum} Tokens`}
          </Button>

          <Typography
            variant="body3"
            textAlign="center"
            color={isComplete ? 'success.main' : 'text.primary'}
          >
            {isComplete ? (
              'You have claimed your daily reward'
            ) : (
              <Box component="span">
                Gain{' '}
                <LocalFireDepartment
                  color="error"
                  fontSize="small"
                  sx={{
                    mb: '-5px',
                  }}
                />{' '}
                momentum every time you claim the daily reward
              </Box>
            )}
          </Typography>
        </Box>

        <Box mt={2}>
          <TitleText
            icon={<LocalFireDepartment fontSize="small" color="error" />}
            title="Momentum"
          />
          <TokenPrizeMessage momentum={momentum} />
        </Box>

        <BulletPoints
          title="How It Works"
          icon={<InfoOutlined fontSize="small" color="info" />}
          points={[
            'Rewards are available every 24 hours and reset at 12:00 AM UTC.',
            `Gain ${MOMENTUM_MULTIPLIER}x momentum every time you claim a daily reward up to a maximum of ${MAX_MOMENTUM}x.`,
            `Each daily reward is worth ${BASE_DAILY_REWARD} tokens multiplied by your current momentum ${momentum}.`,
            `If you miss a claim, you won't be able to claim the reward and you will lose momentum.`,
            <>
              <Link href="/help/vip">VIP members</Link> earn x2 the daily reward
              and x2 the momentum.
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

const TokenPrizeMessage: React.FC<{ momentum: number }> = ({ momentum }) => (
  <Typography
    component="span"
    variant="body2"
    textAlign="center"
    color={'text.primary'}
  >
    Get{' '}
    <ValentinesTicket
      fontSize="small"
      sx={{
        mb: '-5px',
      }}
    />{' '}
    <b>{BASE_DAILY_REWARD} x </b>
    <LocalFireDepartment
      fontSize="small"
      color="error"
      sx={{
        mb: '-5px',
      }}
    />
    <b>{momentum} = </b>
    <ValentinesTicket
      fontSize="small"
      sx={{
        mb: '-5px',
      }}
    />{' '}
    <b>{BASE_DAILY_REWARD * momentum} tokens</b> for today's reward.
  </Typography>
);
