import { Box, Link, Typography } from '@mui/material';
import { ContainImage } from '@worksheets/ui/components/images';
import { routes } from '@worksheets/ui/routes';
import { PrizesPanels } from '@worksheets/util/enums';
import {
  DetailedRaffleSchema,
  RaffleParticipation,
} from '@worksheets/util/types';

export const RaffleHeader: React.FC<{
  headline: string;
  userId: string;
  prizeId: number;
  imageUrl: string;
  name: string;
  expiresAt: number;
  participation: RaffleParticipation | undefined;
  winners: DetailedRaffleSchema['winners'];
}> = ({
  prizeId,
  headline,
  userId,
  participation,
  winners,
  imageUrl,
  name,
  expiresAt,
}) => {
  const expired = Date.now() > expiresAt;
  const youWon = winners.some((winner) => winner.userId === userId);
  const yourEntries = participation?.numTickets ?? 0;
  return (
    <Box
      p={{ xs: 2, sm: 4, md: 6 }}
      display="flex"
      flexDirection="column"
      position="relative"
      gap={{ xs: 2, sm: 4 }}
    >
      <Box>
        <Typography
          component={Link}
          href={routes.prize.path({
            params: { prizeId },
          })}
          color="inherit"
          sx={{
            textDecorationColor: 'inherit',
            typography: { xs: 'h6', sm: 'h4' },
          }}
        >
          {name}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            typography: { xs: 'body2', sm: 'body1' },
          }}
        >
          {headline}
        </Typography>
      </Box>
      <Box
        position="relative"
        sx={{ aspectRatio: '1/1', maxHeight: { xs: 180, sm: 300 } }}
      >
        <ContainImage priority src={imageUrl} alt={name} />
      </Box>
      <Typography
        display={yourEntries || youWon || expired ? 'block' : 'none'}
        typography={{ xs: 'body3', sm: 'body2' }}
        textAlign={'center'}
        color={
          youWon ? 'success.main' : expired ? 'error.main' : 'success.main'
        }
        fontWeight={{ xs: 700, sm: 700 }}
        my={-1}
      >
        {youWon ? (
          <Link
            color="inherit"
            underline="hover"
            href={routes.account.prizes.path({
              bookmark: PrizesPanels.Prizes,
            })}
          >
            View Prize in Account
          </Link>
        ) : expired ? (
          'Raffle Expired'
        ) : (
          <Link
            color="inherit"
            href={routes.account.prizes.path({
              bookmark: PrizesPanels.Raffles,
            })}
          >
            You have {yourEntries} entr{yourEntries > 1 ? 'ies' : 'y'}!
          </Link>
        )}
      </Typography>
    </Box>
  );
};
