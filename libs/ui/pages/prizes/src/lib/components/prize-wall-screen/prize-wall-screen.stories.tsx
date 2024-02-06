import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { mockPrizes } from '@worksheets/ui/components/prizes';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';

import { PrizeWallScreen, PrizeWallScreenProps } from './prize-wall-screen';

const EMPTY_VALUES: PrizeWallScreenProps = {
  hottest: [],
  entered: [],
  list: [],
  searched: [],
  category: 'all',
  setCategory: action('setCategory'),
  search: '',
  setSearch: action('setSearch'),
};

const PREFILLED_VALUES: PrizeWallScreenProps = {
  hottest: mockPrizes,
  entered: mockPrizes,
  list: arrayFromNumber(15).flatMap((i) =>
    mockPrizes.map((r) => ({ ...r, id: r.id + i }))
  ),
  category: 'newest',
  setCategory: action('setCategory'),
  searched: [],
  search: '',
  setSearch: action('setSearch'),
};

const SEARCH_RESULT_VALUES: PrizeWallScreenProps = {
  hottest: mockPrizes,
  entered: [],
  list: arrayFromNumber(15).flatMap((i) =>
    mockPrizes.map((r) => ({ ...r, id: r.id + i }))
  ),
  category: 'newest',
  setCategory: action('setCategory'),
  searched: mockPrizes,
  search: 'A search term',
  setSearch: action('setSearch'),
};

type Story = Meta<typeof PrizeWallScreen>;

const Default: Story = {
  component: PrizeWallScreen,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Empty: Story = {
  args: EMPTY_VALUES,
};

export const Filled: Story = {
  args: PREFILLED_VALUES,
};

export const NoEntries: Story = {
  args: { ...PREFILLED_VALUES, entered: [] },
};

export const PerformingSearch: Story = {
  args: SEARCH_RESULT_VALUES,
};

export const EmptySearchResults: Story = {
  args: { ...SEARCH_RESULT_VALUES, searched: [] },
};
