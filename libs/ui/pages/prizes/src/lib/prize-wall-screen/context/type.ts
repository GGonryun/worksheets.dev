import { PrizeCategory } from '../../../types/categories';
import { PrizeSchema } from '../../../types/prizes';

export type RaffleScreenContextType = {
  hottest: PrizeSchema[];
  list: PrizeSchema[];
  category: PrizeCategory;
  setCategory: (category: PrizeCategory) => void;
};
