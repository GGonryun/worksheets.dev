export type BasicGameInfo = {
  id: string;
  name: string;
  image: string;
};

export type DetailedGameInfo = BasicGameInfo & {
  plays: number;
};
