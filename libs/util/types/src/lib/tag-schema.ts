import { z } from 'zod';

export const gameTagLiteral = [
  'ad-free',
  'board',
  'puzzle',
  'brain',
  'action',
  'adventure',
  'arcade',
  'racing',
  'car',
  'funny',
  'ball',
  'shooting',
  'gun',
  'sports',
  'educational',
  '3d',
  '2d',
  'fighting',
  'boy',
  'girl',
  'defense',
  'idle',
  'fashion',
  'skibidi',
  'drawing',
  'grimace',
  '1p',
  '2p',
  'endless',
  'card',
  'new',
  'popular',
  'mobile',
  'desktop',
  'word',
  'platform',
  'survival',
] as const;

export const gameTagSchema = z.enum(gameTagLiteral);

export type GameTag = z.infer<typeof gameTagSchema>;

export type TagSchema = {
  id: GameTag;
  name: string;
  iconUrl: string;
  description: string;
  relatedTags: GameTag[];
};
