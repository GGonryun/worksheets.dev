import {
  CardGiftcardOutlined,
  CheckCircleOutline,
  InfoOutlined,
  NewReleasesOutlined,
  RemoveCircleOutline,
} from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { FriendsPanels, HelpTokensQuestions } from '@worksheets/util/enums';
import {
  MAX_DAILY_GIFT_BOX_SHARES,
  TOKENS_IN_GIFT_BOX,
} from '@worksheets/util/settings';

import { CollapsibleSection } from '../../../components';
export const GiftBoxSection: React.FC<{
  amount: number;
  onClaim: () => void;
  id: FriendsPanels;
  active: FriendsPanels | undefined;
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
            {isComplete ? 'You have opened all of your gift boxes so far.' : ''}
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
        </Box>
        <BulletPoints
          title="How It Works"
          icon={<InfoOutlined color="info" fontSize="small" />}
          points={[
            `Each gift box contains ${TOKENS_IN_GIFT_BOX} tokens.`,
            `Send up to ${MAX_DAILY_GIFT_BOX_SHARES} gift boxes every day`,
            `Get a free gift box every time you send a gift box to a friend.`,
            <>
              {' '}
              <Link href={routes.help.vip.path()}>VIP members</Link> get x2
              tokens per gift box, x2 drop rates while playing games, and can
              send x2 gift boxes.
            </>,
          ]}
        />
        <PanelFooter
          learn={{
            text: 'Gift Boxes',
            href: routes.help.tokens.path({
              bookmark: HelpTokensQuestions.GiftBoxes,
            }),
          }}
          action={{
            text: 'Send Gift Boxes',
            href: routes.account.friends.path({
              bookmark: FriendsPanels.SendGifts,
            }),
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};
