import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { FC } from 'react';

export type BannerType = 'hot' | 'new' | 'played' | 'none';

export type GameIconProps = {
  id: string;
  name: string;
  caption: string;
  imageUrl: string;
};

export const GameIcon: FC<GameIconProps> = ({
  id,
  name,
  caption,
  imageUrl,
}) => {
  return (
    <ArcadeItemLayout
      href={`/play/${id}`}
      name={name}
      caption={caption}
      imageUrl={imageUrl}
    />
  );
};
