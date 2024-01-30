import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { WebsiteBackground } from '@worksheets/ui/components/wallpaper';
import { Recommendations, SearchResultsData } from '@worksheets/util/types';
import { useRef, useState } from 'react';

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
  searchResults?: SearchResultsData;
  searchQuery: string;
  onSearch: (query: string) => void;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  connected,
  recommendations,
  searchResults,
  searchQuery,
  onSearch,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
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
        query={searchQuery}
        onChange={onSearch}
        onClear={() => onSearch('')}
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
        <MuiToolbar sx={{ mb: 4 }} />
        {children}
      </Box>
      <WebsiteFooter
        href={{
          root: '/',
          about: '/about',
          terms: '/terms',
          privacy: '/privacy',
          cookies: '/cookies',
          help: '/help',
        }}
      />
    </Box>
  );
};
