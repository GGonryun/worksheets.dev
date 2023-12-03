export type GameTag =
  | 'board'
  | 'puzzle'
  | 'brain'
  | 'action'
  | 'adventure'
  | 'arcade'
  | 'racing'
  | 'car'
  | 'funny'
  | 'ball'
  | 'shooting'
  | 'gun'
  | 'sports'
  | 'educational'
  | '3d'
  | '2d'
  | 'fighting'
  | 'boy'
  | 'girl'
  | 'idle'
  | 'fashion'
  | 'drawing'
  | 'grimace'
  | '1p'
  | '2p'
  | 'endless'
  | 'card'
  | 'new'
  | 'popular'
  | 'mobile'
  | 'desktop'
  | 'word';

export type TagSchema = {
  id: GameTag;
  name: string;
  iconUrl: string;
  description: string;
  relatedTags: GameTag[];
};
