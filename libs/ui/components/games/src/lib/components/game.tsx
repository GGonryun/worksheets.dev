import { playRoutes } from '@worksheets/routes';
import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { shorthandNumber } from '@worksheets/util/numbers';
import { BasicGameInfo, PartialBy } from '@worksheets/util/types';
import { FC } from 'react';

export const Game: FC<PartialBy<Omit<BasicGameInfo, 'cover'>, 'plays'>> = ({
  id,
  title,
  plays,
  thumbnail,
}) => {
  return (
    <ArcadeItemLayout
      href={playRoutes.game.url({ params: { gameId: id } })}
      name={title}
      caption={plays != null ? `${shorthandNumber(plays)} plays` : ''}
      imageUrl={thumbnail}
    />
  );
};
