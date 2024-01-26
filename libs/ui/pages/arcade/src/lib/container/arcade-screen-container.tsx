import { games, tags } from '@worksheets/data-access/charity-games';
import { BasicCategoryInfo } from '@worksheets/util/types';

import { ArcadeScreen } from '../components/arcade-screen';
import { PromotedGame } from '../types/promotion';

const ArcadeScreenContainer: React.FC = () => {
  const categories: BasicCategoryInfo[] = Object.entries(tags).map(
    ([, tag]) => ({
      id: tag.id,
      name: tag.name,
      image: tag.iconUrl,
    })
  );

  const promotedGames: PromotedGame[] = games
    .filter((game) => game.qualifier === 'hot')
    .map((game) => ({
      href: `/play/${game.id}`,
      image: game.bannerUrl,
      name: game.name,
    }));

  const primary = promotedGames.slice(0, -1);

  const secondary = primary[primary.length - 1];

  return (
    <ArcadeScreen
      categories={categories}
      featured={{
        primary: primary,
        secondary: secondary,
      }}
      topRaffles={[]}
      topGames={[]}
      allGames={[]}
    />
  );
};

export default ArcadeScreenContainer;
