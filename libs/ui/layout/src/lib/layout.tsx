import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { Toolbar } from './toolbar';
import { Drawer } from './drawer/drawer';
import { GameRecommendations } from './drawer/game-recommendations';
import { useState } from 'react';
import { lighten } from '@mui/system';
import { WebsiteFooter } from './footer';
import { SearchResults } from './drawer/search-results';
import { useDebounce } from '@worksheets/ui-core';
import { Recommendations } from '@worksheets/util/types';
import { CategoryPillProps, GamePillProps } from '@worksheets/ui/pills';

type SearchResults = {
  games: GamePillProps[];
  categories: CategoryPillProps[];
};

type LayoutProps = {
  children: React.ReactNode;
  connected?: boolean;
  recommendations?: Partial<Recommendations>;
  onSearch: (query: string) => Promise<SearchResults>;
  onRandomGame?: () => void;
};

const QUERY_DELAY = 500;

export const Layout: React.FC<LayoutProps> = ({
  children,
  connected,
  recommendations,
  onSearch,
  onRandomGame,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    SearchResults | undefined
  >();

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const debounced = useDebounce(QUERY_DELAY, async (q: string) => {
    setSearchResults(undefined);
    // do not perform a search if the query is empty
    if (q) {
      const results = await onSearch(q);
      setSearchResults(results);
    }
  });

  const handleQueryChange = (query: string) => {
    setQuery(query);
    debounced(query);
  };

  const handleQueryClear = () => {
    setSearchResults(undefined);
    setQuery('');
  };

  const hasSearchResult =
    searchResults != null &&
    (searchResults.games.length > 0 || searchResults.categories.length > 0);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: (theme) => lighten(theme.palette.error.light, 0.7),
      }}
    >
      <Toolbar
        disableLogin
        onDrawerToggle={handleDrawerToggle}
        connected={connected ?? false}
      />
      <Drawer
        onDrawerToggle={handleDrawerToggle}
        open={open}
        query={query}
        onChange={handleQueryChange}
        onClear={handleQueryClear}
        children={
          <Box>
            {searchResults != null && (
              <SearchResults
                games={searchResults.games}
                categories={searchResults.categories}
              />
            )}
            <GameRecommendations
              onRandomGame={onRandomGame}
              hideSections={hasSearchResult}
              hideCategories={hasSearchResult}
              recommendations={recommendations ?? {}}
            />
          </Box>
        }
      />
      <Box flexGrow={1} pb={2}>
        <MuiToolbar />
        {children}
      </Box>
      <WebsiteFooter />
    </Box>
  );
};
