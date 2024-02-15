import {
  CardGiftcardOutlined,
  CheckCircleOutline,
  InfoOutlined,
  NewReleasesOutlined,
  RemoveCircleOutline,
} from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { TokensPanels } from '@worksheets/util/enums';
import {
  GIFT_BOX_DROP_RATE,
  MAX_DAILY_GIFT_BOX_SHARES,
  MAX_TOKENS_IN_GIFT_BOX,
} from '@worksheets/util/settings';

import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { PanelFooter } from '../../panel-footer';

export const GiftBoxSection: React.FC<{
  amount: number;
  onClaim: () => void;
  id: TokensPanels;
  active: TokensPanels | undefined;
  onClick: (id: string) => void;
}> = ({ amount, onClaim, id, active, onClick }) => {
  const isComplete = amount === 0;

  return (
    <CollapsibleSection
      id={id}
      active={active}
      onClick={onClick}
      text={`Gift Boxes (${amount})`}
      description="Open gift boxes to win bonus tokens and prizes."
      Icon={ValentinesGift}
      status={
        isComplete ? (
          <CheckCircleOutline fontSize="large" color="success" />
        ) : (
          <NewReleasesOutlined fontSize="large" color="info" />
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
          {isComplete ? 'No' : amount} Gift Boxes Available
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body3"
            textAlign="center"
            color={isComplete ? 'success.main' : 'text.primary'}
          >
            {isComplete
              ? 'You have opened all of your gift boxes so far.'
              : `You will earn 1 to ${MAX_TOKENS_IN_GIFT_BOX} tokens for each gift box you open.`}
          </Typography>

          <Button
            onClick={onClaim}
            fullWidth
            variant="arcade"
            size="large"
            color={'primary'}
            disabled={isComplete}
            startIcon={
              isComplete ? <RemoveCircleOutline /> : <CardGiftcardOutlined />
            }
          >
            Open Gift Box
          </Button>

          <Typography
            variant="body3"
            textAlign="center"
            color={isComplete ? 'success.main' : 'text.primary'}
          >
            {GIFT_BOX_DROP_RATE}% chance to win a gift box while playing games.
          </Typography>
        </Box>
        <BulletPoints
          title="How It Works"
          icon={<InfoOutlined color="info" fontSize="small" />}
          points={[
            `Each gift box contains a random amount of tokens between 1 and ${MAX_TOKENS_IN_GIFT_BOX} tokens.`,
            `Each game has a ${GIFT_BOX_DROP_RATE}% chance to drop a bonus gift box. Play games to earn gift boxes.`,
            `Send up to ${MAX_DAILY_GIFT_BOX_SHARES} gift boxes every day and Get a free gift box every time you send a gift box to a friend.`,
            <>
              {' '}
              Buy more gift boxes from the{' '}
              <Link href="/store">Charity Store</Link>.
            </>,
            <>
              {' '}
              <Link href="/help/vip">VIP members</Link> get x2 tokens per gift
              box, x2 drop rates while playing games, and can send x2 gift
              boxes.
            </>,
          ]}
        />
        <PanelFooter
          learn={{
            text: 'Gift Boxes',
            href: '/help/tokens#gift-boxes',
          }}
          action={{
            text: 'Send Gift Boxes',
            href: '/account/friends',
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};
