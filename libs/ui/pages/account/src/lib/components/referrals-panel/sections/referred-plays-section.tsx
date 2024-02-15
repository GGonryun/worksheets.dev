import {
  CheckCircleOutline,
  InfoOutlined,
  PendingOutlined,
} from '@mui/icons-material';
import {
  Box,
  LinearProgress,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { calculatePercentage, toPercentage } from '@worksheets/util/numbers';
import { MAX_TOKENS_FROM_REFERRAL_PLAYS } from '@worksheets/util/settings';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { useTimeUntil } from '../../hooks/use-time-until';
import { PanelFooter } from '../../panel-footer';
import { RewardsTimer } from '../../rewards-timer';

export const ReferredPlaysSection: React.FC<{
  tokensEarned: number;
  refreshTimestamp: number;
  isMax: boolean;
}> = ({ tokensEarned, refreshTimestamp, isMax }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const timeRemaining = useTimeUntil(refreshTimestamp);
  return (
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
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
        }}
      >
        <Typography variant="h6" fontSize={{ xs: '1rem', sm: '1.25rem' }}>
          {tokensEarned} / {MAX_TOKENS_FROM_REFERRAL_PLAYS} Tokens Earned
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {isMax ? (
            <CheckCircleOutline
              fontSize="small"
              color="success"
              sx={{
                mt: '-2px',
              }}
            />
          ) : (
            <PendingOutlined
              fontSize="small"
              color="info"
              sx={{
                mt: '-2px',
              }}
            />
          )}

          <Typography variant={isMobile ? 'body3' : 'body2'} fontWeight={900}>
            {toPercentage(tokensEarned, MAX_TOKENS_FROM_REFERRAL_PLAYS)}
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        color={isMax ? 'success' : 'primary'}
        value={calculatePercentage(
          tokensEarned,
          MAX_TOKENS_FROM_REFERRAL_PLAYS
        )}
        sx={{
          my: { xs: -1, sm: -1.5 },
          height: 16,
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      />

      <Typography variant="body2">
        {isMax
          ? `You have received all your tokens today!`
          : `${MAX_TOKENS_FROM_REFERRAL_PLAYS - tokensEarned} more 
            tokens until you reach your daily limit.`}
      </Typography>

      <RewardsTimer timeRemaining={timeRemaining} />

      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title={'How It Works'}
        points={[
          `Users don't need to make an account for you to get tokens.`,
          `Earn 1 token for every game someone plays with your referral link.`,
          `You can earn a maximum of ${MAX_TOKENS_FROM_REFERRAL_PLAYS} tokens per day.`,
          <>
            <Link href="/help/vip">VIP Members</Link> earn x2 tokens when
            someone plays a game, and have no daily limit.
          </>,
        ]}
      />
      <PanelFooter
        learn={{
          text: 'Tokens',
          href: '/learn/tokens',
        }}
        action={{
          text: 'Get Tokens',
          href: '/account/tokens',
        }}
      />
    </Box>
  );
};
