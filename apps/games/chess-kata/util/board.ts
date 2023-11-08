// export enum UnitType {
//   None = 'None',
//   RedPawn1 = 'RedPawn1',
//   RedPawn2 = 'RedPawn2',
//   RedPawn3 = 'RedPawn3',
//   RedPawn4 = 'RedPawn4',
//   RedLeader = 'RedLeader',
//   BluePawn1 = 'BluePawn1',
//   BluePawn2 = 'BluePawn2',
//   BluePawn3 = 'BluePawn3',
//   BluePawn4 = 'BluePawn4',
//   BlueLeader = 'BlueLeader',
// }

export const TOP_SHRINE = { x: 2, y: 0 };
export const BOT_SHRINE = { x: 2, y: 4 };

export enum PlayerColor {
  Red,
  Blue,
}

export const CSS_COLOR: Record<PlayerColor, string> = {
  [PlayerColor.Red]: '#FF0000',
  [PlayerColor.Blue]: '#0000FF',
};

export const OPPOSITE_COLOR: Record<PlayerColor, PlayerColor> = {
  [PlayerColor.Red]: PlayerColor.Blue,
  [PlayerColor.Blue]: PlayerColor.Red,
};

export const CSS_FILTER_COLOR: Record<PlayerColor, string> = {
  //#0000FF
  [PlayerColor.Blue]: `invert(8%) sepia(100%) saturate(7493%) hue-rotate(248deg) brightness(96%) contrast(144%)`,
  //#FF0000
  [PlayerColor.Red]: `invert(25%) sepia(75%) saturate(7439%) hue-rotate(358deg) brightness(106%) contrast(134%)`,
};
