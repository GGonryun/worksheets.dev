import { Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';

export const EmptyPrizeList: React.FC = () => {
  return (
    <Typography variant="body1" color="text.arcade" mt={1}>
      Check back later for more prizes. Or try your luck at our{' '}
      <Button
        variant="arcade"
        color="secondary"
        size="small"
        href={routes.raffles.path()}
        sx={{ ml: 0.5 }}
      >
        Giveaways
      </Button>
    </Typography>
  );
};
