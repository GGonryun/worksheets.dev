import { NavigateNext } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { BattlesCarousel } from '@worksheets/ui/components/battles';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import dynamic from 'next/dynamic';

const TopBattles = () => {
  const isMobile = useMediaQueryDown('sm');

  const battles = trpc.maybe.battles.list.useQuery({
    status: ['ACTIVE'],
  });

  if (!battles.isLoading && !battles.data?.length) return null;

  return (
    <BattlesCarousel
      items={battles.data}
      placeholder={<LoadingBar />}
      title={'Boss Battles'}
      action={
        <Button
          href={routes.battles.path()}
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="error"
          endIcon={isMobile ? undefined : <NavigateNext />}
        >
          All Battles
        </Button>
      }
    />
  );
};

export const DynamicTopBattles = dynamic(() => Promise.resolve(TopBattles), {
  ssr: false,
  loading: () => <LoadingBar />,
});
