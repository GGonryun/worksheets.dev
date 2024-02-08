import { Box } from '@mui/material';
import { FilterableRaffleCategory, RaffleSchema } from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { FancySearch } from './fancy-search';
import { RaffleContents } from './raffle-contents';
import { SearchResults } from './search-results';
import { TitleText } from './title-text';

export const RafflesScreen: React.FC<{
  hottest: RaffleSchema[];
  entered: RaffleSchema[];
  list: RaffleSchema[];
  category: FilterableRaffleCategory;
  setCategory: (c: FilterableRaffleCategory) => void;
  searched: RaffleSchema[];
  query: string;
  setQuery: (s: string) => void;
}> = ({
  query,
  setQuery,
  hottest,
  entered,
  list,
  category,
  setCategory,
  searched,
}) => (
  <CustomContainer>
    <TitleText />
    <Box
      width="100%"
      display="flex"
      gap={{ xs: 4, sm: 4, md: 6 }}
      flexDirection="column"
      alignItems="center"
    >
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          width: '100%',
        }}
      >
        <FancySearch search={query} setSearch={setQuery} />
      </Box>

      {query ? (
        <SearchResults searched={searched} />
      ) : (
        <RaffleContents
          hottest={hottest}
          entered={entered}
          list={list}
          category={category}
          setCategory={setCategory}
        />
      )}
    </Box>
  </CustomContainer>
);

export type RafflesScreenProps = React.ComponentProps<typeof RafflesScreen>;
