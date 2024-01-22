import { PrizeCategory, PrizeSchema } from '@worksheets/ui/prizes';

export type RaffleScreenContextType = {
  hottest: PrizeSchema[];
  list: PrizeSchema[];
  category: PrizeCategory;
  setCategory: (category: PrizeCategory) => void;
};
