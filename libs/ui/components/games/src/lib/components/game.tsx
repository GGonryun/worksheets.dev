import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { routes } from '@worksheets/ui/routes';
import { shorthandNumber } from '@worksheets/util/numbers';
import { FC } from 'react';

export type GameProps = {
  id: string;
  name: string;
  imageUrl: string;
  plays?: number;
};

export const Game: FC<GameProps> = ({ id, name, plays, imageUrl }) => {
  return (
    <ArcadeItemLayout
      href={routes.game.path({ params: { gameId: id } })}
      name={name}
      caption={plays != null ? `${shorthandNumber(plays)}+ plays` : ''}
      imageUrl={imageUrl}
    />
  );
};
