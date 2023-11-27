export type GameTag =
  | 'board'
  | 'puzzle'
  | 'brain'
  | 'card'
  | 'new'
  | 'popular'
  | 'mobile'
  | 'desktop';

export type TagSchema = {
  id: GameTag;
  name: string;
  iconUrl: string;
  description: string;
  relatedTags: GameTag[];
};
