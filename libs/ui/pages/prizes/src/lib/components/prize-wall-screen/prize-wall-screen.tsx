import { Box } from '@mui/material';
import { FilterablePrizeCategory } from '@worksheets/ui/components/prizes';
import { PrizeSchema } from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { FancySearch } from './fancy-search';
import { PrizeContents } from './prize-contents';
import { SearchResults } from './search-results';
import { TitleText } from './title-text';

export const PrizeWallScreen: React.FC<{
  hottest: PrizeSchema[];
  entered: PrizeSchema[];
  list: PrizeSchema[];
  category: FilterablePrizeCategory;
  setCategory: (c: FilterablePrizeCategory) => void;
  searched: PrizeSchema[];
  search: string;
  setSearch: (s: string) => void;
}> = ({
  search,
  setSearch,
  hottest,
  entered,
  list,
  category,
  setCategory,
  searched,
}) => {
  return (
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
          <FancySearch search={search} setSearch={setSearch} />
        </Box>

        {search ? (
          <SearchResults searched={searched} />
        ) : (
          <PrizeContents
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
};

export type PrizeWallScreenProps = React.ComponentProps<typeof PrizeWallScreen>;
