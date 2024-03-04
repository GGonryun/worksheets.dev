import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { routes } from '@worksheets/ui/routes';
import { shorthandNumber } from '@worksheets/util/numbers';
import { BasicGameInfo, PartialBy } from '@worksheets/util/types';
import { FC } from 'react';

export const Game: FC<PartialBy<BasicGameInfo, 'plays'>> = ({
  id,
  name,
  plays,
  imageUrl,
}) => {
  return (
    <ArcadeItemLayout
      href={routes.game.url({ params: { gameId: id } })}
      name={name}
      caption={plays != null ? `${shorthandNumber(plays)}+ plays` : ''}
      imageUrl={imageUrl}
    />
  );
};
