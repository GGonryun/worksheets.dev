import { AppBar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { WebsiteBackground } from '@worksheets/ui/components/wallpaper';
import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { LayoutLinks, LogoBox, WebsiteFooter } from '@worksheets/ui/layout';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const href: LayoutLinks = {
    root: CHARITY_GAMES_BASE_URL,
    about: `${CHARITY_GAMES_BASE_URL}/about`,
    help: `${CHARITY_GAMES_BASE_URL}/help`,
    privacy: `${CHARITY_GAMES_BASE_URL}/privacy`,
    cookies: `${CHARITY_GAMES_BASE_URL}/cookies`,
    terms: `${CHARITY_GAMES_BASE_URL}/terms`,
  };
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
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          background: (theme) => theme.palette.background['gradient-soft'],
        }}
      >
        <MuiToolbar
          variant="dense"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
          }}
        >
          <LogoBox />
          <Button
            variant="arcade"
            color="success"
            href={href.root}
            size="small"
          >
            All Games
          </Button>
        </MuiToolbar>
      </AppBar>

      <Box flexGrow={1} pb={2}>
        <MuiToolbar sx={{ mb: 1 }} />
        {children}
      </Box>
      <WebsiteFooter href={href} />
    </Box>
  );
};
