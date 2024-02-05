import { NavigateNext } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import {
  FilterablePrizeCategory,
  TitledPrizeCarousel,
} from '@worksheets/ui/components/prizes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { PrizeSchema } from '@worksheets/util/types';

import { ChangeCategory } from './change-category';
import { PrizesGroup } from './prizes-group';

export const PrizeContents: React.FC<{
  hottest: PrizeSchema[];
  entered: PrizeSchema[];
  list: PrizeSchema[];
  category: FilterablePrizeCategory;
  setCategory: (c: FilterablePrizeCategory) => void;
}> = ({ hottest, entered, list, category, setCategory }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      {!!entered.length && (
        <TitledPrizeCarousel
          items={entered}
          title={isMobile ? 'Entered' : 'Entered Raffles'}
          action={
            <Button
              variant="arcade"
              color="secondary"
              size={isMobile ? 'small' : 'medium'}
              sx={{ width: 'fit-content', alignSelf: 'flex-end' }}
              endIcon={isMobile ? undefined : <NavigateNext />}
              href="/account/raffles#won"
            >
              Raffles Won
            </Button>
          }
        />
      )}

      <TitledPrizeCarousel
        items={hottest}
        title={isMobile ? 'Hottest' : 'Hottest Raffles'}
      />

      <PrizesGroup
        header={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <ChangeCategory category={category} setCategory={setCategory} />
            <Button
              variant="arcade"
              color="error"
              href="/raffles/expired"
              size={isMobile ? 'small' : 'medium'}
              endIcon={isMobile ? undefined : <NavigateNext />}
            >
              {isMobile ? 'Expired' : 'Expired Raffles'}
            </Button>
          </Box>
        }
        prizes={list}
      />
    </>
  );
};
