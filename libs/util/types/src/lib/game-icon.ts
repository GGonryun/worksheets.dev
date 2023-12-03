import { GameQualifier } from './game-qualifier';

export type GameIcon = {
  // the id will be used to link to the game page
  id: string;
  // href supports any relative or absolute url to redirect. used by our legacy games which are hosted on a different domain.
  href?: string;
  // name will be displayed as the icon label on hover.
  name: string;
  // imageUrl will be displayed as the icon image.
  imageUrl?: string;
  // banner will be displayed in the top left corner of the icon
  banner?: GameQualifier;
  // if size is not provided, the icon will fill the available space of its parent container
  size?: number;
};
