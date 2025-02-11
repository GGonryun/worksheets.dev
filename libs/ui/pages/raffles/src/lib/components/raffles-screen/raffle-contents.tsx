import { NavigateNext } from '@mui/icons-material';
import { Button } from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import {
  RaffleCarousel,
  RafflesGroup,
} from '@worksheets/ui/components/raffles';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { InventoryPanels } from '@worksheets/util/enums';
import { EnteredRaffleSchema, RaffleSchema } from '@worksheets/util/types';

export const RaffleContents: React.FC<{
  entered: EnteredRaffleSchema[];
  list: RaffleSchema[];
}> = ({ entered, list }) => {
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
              href={playRoutes.account.inventory.path({
                bookmark: InventoryPanels.RaffleParticipation,
              })}
            >
              History
            </Button>
          }
        />
      )}
      <RafflesGroup
        title={'Raffles'}
        action={
          <Button
            variant="arcade"
            color="error"
            href={playRoutes.raffles.expired.path()}
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
