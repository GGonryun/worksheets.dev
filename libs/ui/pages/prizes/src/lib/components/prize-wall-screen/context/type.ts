import { PrizeCategory, PrizeSchema } from '@worksheets/util/types';

export type RaffleScreenContextType = {
  hottest: PrizeSchema[];
  list: PrizeSchema[];
  category: PrizeCategory;
  setCategory: (category: PrizeCategory) => void;
};
