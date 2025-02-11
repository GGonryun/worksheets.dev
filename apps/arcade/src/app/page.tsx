import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { ArcadeScreen, ArcadeScreenProps } from '@worksheets/ui/pages/arcade';
import { Boundary } from '@worksheets/ui/suspense/server';
import { isExpired } from '@worksheets/util/time';
import { uniqBy } from 'lodash';

const maxCarouselLength = 20;
const maxFeaturedGames = 8;

const getStaticProps = async (): Promise<
  Omit<ArcadeScreenProps, 'recentGames'>
> => {
  const trpc = await createStaticTRPC();

  const categories = await trpc.public.categories.list.fetch({
    showEmpty: false,
  });
  const games = await trpc.public.games.list.fetch({});
  const topRaffles = await trpc.public.raffles.list.fetch({
    category: 'hottest',
  });

  const allGames = [...games].filter(
    (g) =>
      g.status === 'PUBLISHED' ||
      g.publishAt === null ||
      isExpired(new Date(g.publishAt))
  );
  const topGames = [...allGames]
    .sort((a, b) => b.plays - a.plays)
    .slice(0, maxCarouselLength);
  const newGames = [...allGames]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, maxCarouselLength);

  const featured = uniqBy([...topGames, ...newGames], 'id').slice(
    0,
    maxFeaturedGames
  );

  const primary = featured.slice(0, -1);

  const secondary = featured[featured.length - 1];

  return {
    categories,
    featured: {
      primary,
      secondary,
    },
    topGames,
    newGames,
    allGames,
    topRaffles,
  };
};

export default async function Page() {
  const data = await getStaticProps();
  return (
    <Boundary>
      <ArcadeScreen {...data} />
    </Boundary>
  );
}
