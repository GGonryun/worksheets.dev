import { FC } from 'react';
import { Logout } from '@mui/icons-material';
import { ArrowUpRight } from '@worksheets/ui/icons';
import { GameIconProps } from '@worksheets/ui/game-grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export type AccountScreenProps = {
  exploreHref?: string;
  onLogout: () => void;
  recent: GameIconProps[];
};

export const AccountScreen: FC<AccountScreenProps> = ({
  recent,
  onLogout,
  exploreHref,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          flexWrap="wrap"
          gap={2}
        >
          <Button
            variant="outlined"
            color="black"
            href={exploreHref}
            endIcon={<ArrowUpRight sx={{ ml: -0.5 }} />}
            sx={{
              borderRadius: 6,
              px: 3,
              fontFamily: 'Dangrek',
            }}
          >
            Explore Games
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<Logout />}
            onClick={onLogout}
            sx={{
              fontFamily: 'Dangrek',
              px: 3,
              borderRadius: 6,
            }}
          >
            Log Out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
