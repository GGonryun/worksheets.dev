import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { WebsiteBackground } from '@worksheets/ui/components/wallpaper';

import { LayoutLinks } from '../types';
import { WebsiteFooter } from './footer';
import { Toolbar } from './toolbar';

type LayoutProps = {
  children: React.ReactNode;
  connected?: boolean;
  links?: LayoutLinks;
  disableLogin?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  connected,
  links,
  disableLogin,
}) => {
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
        disableLogin={disableLogin}
        connected={connected ?? false}
        loginHref={links?.login ?? '/login'}
        accountHref={links?.account ?? '/account'}
      />
      <Box flexGrow={1} pb={10} pt={2} className={'website-content'}>
        <MuiToolbar />
        {children}
      </Box>
      <WebsiteFooter links={links} />
    </Box>
  );
};
