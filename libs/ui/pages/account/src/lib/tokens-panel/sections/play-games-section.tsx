import {
  CheckCircleOutline,
  InfoOutlined,
  NewReleasesOutlined,
  PendingOutlined,
  Star,
} from '@mui/icons-material';
import {
  Box,
  LinearProgress,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { WebGamepad } from '@worksheets/icons/web';
import { calculatePercentage, toPercentage } from '@worksheets/util/numbers';
import {
  MAX_TOKENS_PER_DAY,
  MAX_TOKENS_PER_GAME,
} from '@worksheets/util/settings';

import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { PanelFooter } from '../../panel-footer';

export const PlayGamesSection: React.FC<{ tokens: number }> = ({ tokens }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isComplete = tokens >= MAX_TOKENS_PER_DAY;
  const isFresh = tokens === 0;

  const percentProgress: string = toPercentage(tokens, MAX_TOKENS_PER_DAY);

  return (
    <CollapsibleSection
      text="Play Games"
      description="Win tokens every time you play a game."
      Icon={WebGamepad}
      status={
        isFresh ? (
          <NewReleasesOutlined fontSize="large" color="info" />
        ) : isComplete ? (
          <CheckCircleOutline fontSize="large" color="success" />
        ) : (
          <PendingOutlined fontSize="large" color="info" />
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
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
          }}
        >
          <Typography variant="h6" fontSize={{ xs: '1rem', sm: '1.25rem' }}>
            {tokens} / {MAX_TOKENS_PER_DAY} Tokens Earned
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {isFresh ? (
              <NewReleasesOutlined
                fontSize="small"
                color="info"
                sx={{ mt: '-2px' }}
              />
            ) : isComplete ? (
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
              {percentProgress}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          color={isComplete ? 'success' : 'primary'}
          value={calculatePercentage(tokens, MAX_TOKENS_PER_DAY)}
          sx={{
            my: { xs: -1, sm: -1.5 },
            height: 16,
            borderRadius: (theme) => theme.shape.borderRadius,
          }}
        />

        <Typography variant="body2">
          {isComplete
            ? `You have received all your tokens today. Play again tomorrow!`
            : `Play more games to earn ${MAX_TOKENS_PER_DAY - tokens} 
            tokens.`}
        </Typography>

        <BulletPoints
          title="Bonus Games"
          icon={<Star fontSize="small" color="highlight" />}
          points={[
            <Link href="/play">Sudoku</Link>,
            <Link href="/play">Solitaire 2048</Link>,
            <Link href="/play">Emoji War</Link>,
          ]}
        />

        <BulletPoints
          title="How It Works"
          icon={<InfoOutlined fontSize="small" color="info" />}
          points={[
            <>
              Select a game from the <Link href="/play">Arcade</Link>, bonus
              games earn x2 tokens.
            </>,
            `Press the play game button and you'll immediately earn ${MAX_TOKENS_PER_GAME} tokens.`,
            `There is no time limit or score requirement to earn tokens.`,
            <>
              <Link href="/help/vip">VIP Members</Link> earn twice as many
              tokens per game and have no daily limit.
            </>,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Playing Games',
            href: '/help/playing-games',
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
