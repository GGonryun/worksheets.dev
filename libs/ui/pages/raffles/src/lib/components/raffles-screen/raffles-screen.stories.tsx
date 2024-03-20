import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { mockRaffles } from '@worksheets/ui/components/raffles';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';

import { RafflesScreen, RafflesScreenProps } from './raffles-screen';

const EMPTY_VALUES: RafflesScreenProps = {
  hottest: [],
  entered: [],
  list: [],
  searched: [],
  category: 'newest',
  setCategory: action('setCategory'),
  query: '',
  setQuery: action('setQuery'),
};

const PREFILLED_VALUES: RafflesScreenProps = {
  hottest: mockRaffles,
  entered: mockRaffles,
  list: arrayFromNumber(15).flatMap((i) =>
    mockRaffles.map((r) => ({ ...r, id: r.id + i }))
  ),
  category: 'newest',
  setCategory: action('setCategory'),
  searched: [],
  query: '',
  setQuery: action('setQuery'),
};

const SEARCH_RESULT_VALUES: RafflesScreenProps = {
  hottest: mockRaffles,
  entered: [],
  list: arrayFromNumber(15).flatMap((i) =>
    mockRaffles.map((r) => ({ ...r, id: r.id + i }))
  ),
  category: 'newest',
  setCategory: action('setCategory'),
  searched: mockRaffles,
  query: 'A search term',
  setQuery: action('setQuery'),
};

type Story = Meta<typeof RafflesScreen>;

const Default: Story = {
  component: RafflesScreen,
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
