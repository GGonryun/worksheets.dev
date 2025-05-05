export const gameBasicInfoProperties = {
  id: true,
  teamId: true,
  title: true,
  description: true,
  plays: true,
  cover: true,
  thumbnail: true,
} as const;

export type GameBasicInfoProperties = typeof gameBasicInfoProperties;
