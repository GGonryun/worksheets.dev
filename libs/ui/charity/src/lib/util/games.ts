import { GameSchema } from '@worksheets/util/types';

export type GameQualifier = GameSchema['qualifier'];

export type GameDefinition = {
  // the id will be used to link to the game page
  id: string;
  // name will be displayed as the icon label on hover.
  name: string;
  // the name of the developer, not the id.
  developer: string;
  // imageUrl will be displayed as the icon image.
  imageUrl?: string;
  // the qualifier will be used to show a badge on the icon.
  qualifier?: GameQualifier;
};
