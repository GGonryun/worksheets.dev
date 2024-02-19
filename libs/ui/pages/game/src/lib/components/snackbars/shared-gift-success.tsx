import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { TokensPanels } from '@worksheets/util/enums';

export const SharedGiftSnackbarMessage: React.FC<{
  username: string;
}> = ({ username }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      mt: -0.25,
    }}
  >
    <Typography variant="body1">
      You have sent a gift to <b>{username}</b>!
      <br />
      You also earned a gift box for yourself.
    </Typography>

    <Button
      variant="contained"
      color="white"
      href={routes.account.tokens.path({
        bookmark: TokensPanels.GiftBoxes,
      })}
      endIcon={<ArrowRightAlt fontSize="small" sx={{ mt: '-2px' }} />}
      sx={{
        width: 'fit-content',
        mt: 1,
      }}
    >
      Open Gift Boxes
    </Button>
  </Box>
);
