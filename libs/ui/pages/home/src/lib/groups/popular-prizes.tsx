import {
  Box,
  Button,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Carousel } from '@worksheets/ui/carousel';
import { Prize, PrizeSchema, TitledPrizeCarousel } from '@worksheets/ui/prizes';

export const PopularPrizes: React.FC<{
  items: PrizeSchema[];
  title: string;
}> = ({ items, title }) => {
  return (
    <TitledPrizeCarousel
      items={items}
      title={title}
      action={<SeeMoreButton />}
    />
  );
};

const SeeMoreButton = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Button
      href="/prizes"
      variant="arcade"
      color="success"
      size={isMobile ? 'small' : 'medium'}
      sx={{
        alignSelf: 'flex-end',
      }}
    >
      All Prizes
    </Button>
  );
};
