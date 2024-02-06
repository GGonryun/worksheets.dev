import { Box, Link, Typography } from '@mui/material';
import { ContainImage } from '@worksheets/ui/components/images';
import { PrizesPanels } from '@worksheets/util/enums';

export const PrizeHeader: React.FC<{
  headline: string;
  imageUrl: string;
  name: string;
  expiresAt: number;
  youWon: boolean;
}> = ({ headline, imageUrl, name, expiresAt, youWon }) => {
  const expired = Date.now() > expiresAt;
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
          sx={{
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
        sx={{ aspectRatio: '1/1', maxHeight: { xs: 128, sm: 256 } }}
      >
        <ContainImage priority src={imageUrl} alt={name} />
      </Box>
      <Typography
        display={youWon || expired ? 'block' : 'none'}
        typography={{ xs: 'body3', sm: 'body2' }}
        textAlign={'center'}
        color={youWon ? 'success.main' : 'error.main'}
        fontWeight={{ xs: 700, sm: 700 }}
        my={-1}
      >
        {youWon ? (
          <Link
            color="inherit"
            underline="hover"
            href={`/account/prizes#${PrizesPanels.Prizes}`}
          >
            Claim Prize
          </Link>
        ) : (
          'Raffle Expired'
        )}
      </Typography>
    </Box>
  );
};
