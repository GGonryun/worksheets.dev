export type GameTag =
  | 'board'
  | 'puzzle'
  | 'brain'
  | 'action'
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
