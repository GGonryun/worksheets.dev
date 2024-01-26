import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { WebsiteBackground } from '@worksheets/ui/components/wallpaper';
import { useDebounce } from '@worksheets/ui-core';
import { useRef, useState } from 'react';

import { SearchResultsData } from '../types';
import { Recommendations } from '../types/recommendations';
import { Actions } from './drawer/actions';
import { Drawer } from './drawer/drawer';
import { GameRecommendations } from './drawer/game-recommendations';
import { SearchResults } from './drawer/search-results';
import { WebsiteFooter } from './footer';
import { Toolbar } from './toolbar';

type LayoutProps = {
  children: React.ReactNode;
  connected?: boolean;
  recommendations?: Partial<Recommendations>;
  onSearch: (query: string) => Promise<SearchResultsData>;
};

const QUERY_DELAY = 500;

export const Layout: React.FC<LayoutProps> = ({
  children,
  connected,
  recommendations,
  onSearch,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    SearchResultsData | undefined
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
      contentRef.current?.scrollTo({ top: 0 });
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

  const performedSearch = searchResults != null;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <WebsiteBackground />
      <Toolbar
        disableLogin={false}
        onDrawerToggle={handleDrawerToggle}
        connected={connected ?? false}
      />
      <Drawer
        onDrawerToggle={handleDrawerToggle}
        open={open}
        query={query}
        onChange={handleQueryChange}
        onClear={handleQueryClear}
        contentRef={contentRef}
        children={
          <Box>
            {performedSearch && (
              <SearchResults
                games={searchResults.games}
                categories={searchResults.categories}
              />
            )}
            {!performedSearch && (
              <GameRecommendations recommendations={recommendations ?? {}} />
            )}
            <Actions />
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
