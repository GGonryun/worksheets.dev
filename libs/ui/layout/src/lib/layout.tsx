import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { lighten } from '@mui/system';
import { CategoryPillProps, GamePillProps } from '@worksheets/ui/pills';
import { useDebounce } from '@worksheets/ui-core';
import { Recommendations } from '@worksheets/util/types';
import { useRef, useState } from 'react';

import { Drawer } from './drawer/drawer';
import { DrawerActions } from './drawer/drawer-actions';
import { GameRecommendations } from './drawer/game-recommendations';
import { SearchResults } from './drawer/search-results';
import { WebsiteFooter } from './footer';
import { Toolbar } from './toolbar';
import { WebsiteBackground } from './website-background';

type SearchResults = {
  games: GamePillProps[];
  categories: CategoryPillProps[];
};

type LayoutProps = {
  children: React.ReactNode;
  connected?: boolean;
  recommendations?: Partial<Recommendations>;
  recentGamesSection: React.ReactNode;
  onSearch: (query: string) => Promise<SearchResults>;
  onRandomGame: () => void;
};

const QUERY_DELAY = 500;

export const Layout: React.FC<LayoutProps> = ({
  children,
  connected,
  recommendations,
  recentGamesSection,
  onSearch,
  onRandomGame,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

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
        // TODO: remove this once the drawer and toolbar are fixed and updated to new design.
        backgroundColor: (theme) => lighten(theme.palette.error.light, 0.7),
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
              <>
                <GameRecommendations recommendations={recommendations ?? {}} />
                {recentGamesSection}
              </>
            )}
            <DrawerActions
              onRandomGame={() => {
                onRandomGame();
                setOpen(false);
              }}
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
