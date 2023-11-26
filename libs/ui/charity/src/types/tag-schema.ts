export type GameTags =
  | 'board'
  | 'puzzle'
  | 'brain'
  | 'card'
  | 'new'
  | 'popular'
  | 'top-rated'
  | 'mobile'
  | 'desktop';

export type TagSchema = {
  id: GameTags;
  name: string;
  iconUrl: string;
};
