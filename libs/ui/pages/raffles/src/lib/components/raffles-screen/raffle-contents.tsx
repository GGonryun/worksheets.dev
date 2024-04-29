import { NavigateNext } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import {
  RaffleCarousel,
  RafflesGroup,
} from '@worksheets/ui/components/raffles';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { InventoryPanels } from '@worksheets/util/enums';
import {
  EnteredRaffleSchema,
  FilterableRaffleCategory,
  RaffleSchema,
} from '@worksheets/util/types';

import { ChangeCategory } from './change-category';

export const RaffleContents: React.FC<{
  hottest: RaffleSchema[];
  entered: EnteredRaffleSchema[];
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
              href={routes.account.inventory.path({
                bookmark: InventoryPanels.RaffleParticipation,
              })}
            >
              History
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
            href={routes.raffles.expired.path()}
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
