import { Box, Typography } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { RaffleSchema } from '@worksheets/util/types';

export const RaffleHeader: React.FC<{
  raffle: RaffleSchema;
}> = ({ raffle }) => {
  return (
    <Box p={4} height="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Box>
          <Typography
            sx={{
              typography: { xs: 'h6', sm: 'h5' },
            }}
          >
            {raffle.name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              typography: { xs: 'body3', sm: 'body2' },
            }}
          >
            {raffle.description.slice(0, 80)}
            {raffle.description.length > 80 ? '...' : ''}
          </Typography>
        </Box>
        <PrizeImage src={raffle.imageUrl} alt={raffle.name} />
      </Box>
    </Box>
  );
};

const PrizeImage: React.FC<{ src: string; alt: string }> = (props) => {
  return (
    <Box
      position="relative"
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        maxHeight: 320,
        alignItems: 'center',
        aspectRatio: '1/1',
      }}
    >
      <FillImage priority {...props} />
    </Box>
  );
};
