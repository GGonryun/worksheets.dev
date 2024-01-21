import { Box, Typography } from '@mui/material';
import { ContainImage } from '@worksheets/ui/images';

export const PrizeHeader: React.FC<{
  headline: string;
  imageUrl: string;
  title: string;
}> = ({ headline, imageUrl, title }) => (
  <Box p={{ xs: 3, sm: 6 }} display="flex" flexDirection="column" gap={4}>
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
  </Box>
);
