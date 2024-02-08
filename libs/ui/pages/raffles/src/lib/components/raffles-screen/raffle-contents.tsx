import { NavigateNext } from '@mui/icons-material';
import { Button } from '@mui/material';
import {
  RaffleCarousel,
  RafflesGroup,
} from '@worksheets/ui/components/raffles';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { PrizesPanels } from '@worksheets/util/enums';
import { FilterableRaffleCategory, RaffleSchema } from '@worksheets/util/types';

import { ChangeCategory } from './change-category';

export const RaffleContents: React.FC<{
  hottest: RaffleSchema[];
  entered: RaffleSchema[];
  list: RaffleSchema[];
  category: FilterableRaffleCategory;
  setCategory: (c: FilterableRaffleCategory) => void;
}> = ({ hottest, entered, list, category, setCategory }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      {!!entered.length && (
        <RaffleCarousel
          items={entered}
          title={isMobile ? 'Entered' : 'Entered Raffles'}
          action={
            <Button
              variant="arcade"
              color="secondary"
              size={isMobile ? 'small' : 'medium'}
              sx={{ width: 'fit-content', alignSelf: 'flex-end' }}
              endIcon={isMobile ? undefined : <NavigateNext />}
              href={`/account/prizes#${PrizesPanels.Prizes}`}
            >
              Raffles Won
            </Button>
          }
        />
      )}

      <RaffleCarousel
        items={hottest}
        title={isMobile ? 'Hottest' : 'Hottest Raffles'}
      />

      <RafflesGroup
        title={<ChangeCategory category={category} setCategory={setCategory} />}
        action={
          <Button
            variant="arcade"
            color="error"
            href="/raffles/expired"
            size={isMobile ? 'small' : 'medium'}
            endIcon={isMobile ? undefined : <NavigateNext />}
          >
            {isMobile ? 'Expired' : 'Expired Raffles'}
          </Button>
        }
        raffles={list}
      />
    </>
  );
};
