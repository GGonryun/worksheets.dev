import { ArcadeItemLayout } from '@worksheets/ui/arcade';
import { FC } from 'react';

export type BannerType = 'hot' | 'new' | 'played' | 'none';

export type GameProps = {
  id: string;
  name: string;
  caption: string;
  imageUrl: string;
};

export const GameIcon: FC<GameProps> = ({ id, name, caption, imageUrl }) => {
  return (
    <ArcadeItemLayout
      href={`/play/${id}`}
      name={name}
      caption={caption}
      imageUrl={imageUrl}
    />
  );
};
