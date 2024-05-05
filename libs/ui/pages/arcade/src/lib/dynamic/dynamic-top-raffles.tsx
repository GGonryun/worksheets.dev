import { NavigateNext } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { RaffleCarousel } from '@worksheets/ui/components/raffles';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import dynamic from 'next/dynamic';

const TopRaffles = () => {
  const isMobile = useMediaQueryDown('sm');
  const raffles = trpc.public.raffles.list.useQuery({
    category: 'hottest',
  });

  if (!raffles.isLoading && !raffles.data?.length) return null;

  return (
    <RaffleCarousel
      items={undefined}
      placeholder={<LoadingBar />}
      title={'Active Raffles'}
      action={
        <Button
          href={routes.raffles.path()}
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="error"
          endIcon={isMobile ? undefined : <NavigateNext />}
        >
          All Raffles
        </Button>
      }
    />
  );
};

export const DynamicTopRaffles = dynamic(() => Promise.resolve(TopRaffles), {
  ssr: false,
  loading: () => <LoadingBar />,
});
