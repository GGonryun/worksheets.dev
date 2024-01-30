import { mockPrizes } from '@worksheets/ui/components/prizes';
import { arrayFromNumber } from '@worksheets/util/arrays';
import { MockActionType } from '@worksheets/util/types';

import { RaffleScreenContextType } from './type';

export const EMPTY_VALUES = (
  action: MockActionType
): RaffleScreenContextType => ({
  hottest: [],
  list: [],
  category: 'all',
  setCategory: action('setFieldValue'),
});

export const PREFILLED_VALUES = (
  action: MockActionType
): RaffleScreenContextType => ({
  hottest: mockPrizes,
  list: arrayFromNumber(15).flatMap((i) =>
    mockPrizes.map((r) => ({ ...r, id: r.id + i }))
  ),
  category: 'newest',
  setCategory: action('setFieldValue'),
});
