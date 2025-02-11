import { playRoutes } from '@worksheets/routes';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { VideoGameJsonLdProps } from 'next-seo';

import { LdJsonScript } from './ld-json';

export type GameLdJsonOptions = {
  game: SerializableGameSchema;
  developer: DeveloperSchema;
};

export const gameJsonLd = ({
  game,
  developer,
}: GameLdJsonOptions): VideoGameJsonLdProps => ({
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: game.name,
  url: playRoutes.game.url({ params: { gameId: game.id } }),
  image: game.iconUrl,
  description: game.description,
  inLanguage: ['English'],
  playMode: 'SinglePlayer',
  genre: game.categories,
  gamePlatform: game.viewport.devices,
  applicationCategory: 'Game',
  applicationSubCategory: game.categories[0],
  keywords: game.categories.join(', '),
  datePublished: game.createdAt,
  publisher: {
    name: 'Charity Games',
    url: playRoutes.game.url({ params: { gameId: game.id } }),
  },
  producer: {
    name: developer.name,
    url: playRoutes.developer.url({
      params: { developerId: developer.id },
    }),
  },
});

export const GameLdJson: React.FC<GameLdJsonOptions> = (props) => {
  return <LdJsonScript json={gameJsonLd(props)} />;
};
