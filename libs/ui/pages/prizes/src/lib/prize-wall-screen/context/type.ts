import { PrizeCategory, PrizeSchema } from '@worksheets/ui/components/prizes';

export type RaffleScreenContextType = {
  hottest: PrizeSchema[];
  list: PrizeSchema[];
  category: PrizeCategory;
  setCategory: (category: PrizeCategory) => void;
};
