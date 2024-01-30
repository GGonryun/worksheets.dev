import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';

import { ArcadeScreen } from '../components/arcade-screen';

const ArcadeScreenContainer: React.FC = () => {
  const { data, isLoading, error } = trpc.arcade.details.useQuery(undefined, {
    enabled: true,
  });

  if (isLoading) return <LoadingScreen />;

  if (error) return <ErrorScreen />;

  return (
    <ArcadeScreen
      categories={data.categories}
      featured={data.featured}
      topRaffles={data.topRaffles}
      topGames={data.topGames}
      allGames={data.allGames}
    />
  );
};

export default ArcadeScreenContainer;
