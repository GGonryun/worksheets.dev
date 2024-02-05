import { Box, Typography } from '@mui/material';
import { ContainImage } from '@worksheets/ui/components/images';

export const PrizeHeader: React.FC<{
  headline: string;
  imageUrl: string;
  title: string;
  expires: number;
}> = ({ headline, imageUrl, title, expires }) => {
  const expired = Date.now() > expires;
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
          {title}
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
        <ContainImage priority src={imageUrl} alt={title} />
      </Box>
      <Typography
        display={expired ? 'block' : 'none'}
        typography={{ xs: 'body3', sm: 'body2' }}
        textAlign={'center'}
        color="error.main"
        fontWeight={{ xs: 700, sm: 700 }}
        my={-1}
      >
        Raffle Expired
      </Typography>
    </Box>
  );
};
