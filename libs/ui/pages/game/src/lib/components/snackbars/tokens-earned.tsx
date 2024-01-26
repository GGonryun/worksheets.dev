import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { ReferralsPanels, TokensPanels } from '@worksheets/util/enums';

export const TokensEarnedSnackbarMessage: React.FC<{
  earnedGiftBox: boolean;
  tokensEarned: number;
}> = ({ earnedGiftBox, tokensEarned }) => {
  const wonGiftBoxMessage = (
    <>
      You found a <b>gift box</b> and <b>{tokensEarned} tokens</b> while playing
      this game!
    </>
  );
  const basicMessage = (
    <>
      You found <b>{tokensEarned} tokens</b> while playing this game!
    </>
  );

  const emptyMessage = (
    <>
      You've collected all your tokens today!
      <br /> Earn more tokens when you share <b>gift boxes</b>, or{' '}
      <b>invite friends</b>.
    </>
  );

  const noTokensRemaining = tokensEarned === 0;

  const giftBoxHref = `/account/tokens#${TokensPanels.GiftBoxes}`;
  const playGamesHref = `/account/tokens#${TokensPanels.PlayGames}`;
  const referralsHref = `/account/referrals#${ReferralsPanels.ShareYourLink}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mt: -0.25,
      }}
    >
      <Typography>
        {noTokensRemaining
          ? emptyMessage
          : earnedGiftBox
          ? wonGiftBoxMessage
          : basicMessage}
      </Typography>

      <Button
        variant="contained"
        color="white"
        href={
          noTokensRemaining
            ? referralsHref
            : earnedGiftBox
            ? giftBoxHref
            : playGamesHref
        }
        endIcon={<ArrowRightAlt fontSize="small" sx={{ mt: '-2px' }} />}
        sx={{
          width: 'fit-content',
        }}
      >
        {noTokensRemaining
          ? 'Invite Friends'
          : earnedGiftBox
          ? 'Open Gift Box'
          : 'View Tokens'}
      </Button>
    </Box>
  );
};
