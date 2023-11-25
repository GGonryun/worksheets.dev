import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import { FC } from 'react';
import { GameIcon, GameIconProps } from '../../games/game-icon';
import { ArrowUpRight } from '../../icons/arrow-up-right';
import { Logout } from '@mui/icons-material';

export type AccountScreenProps = {
  exploreHref?: string;
  recent: GameIconProps[];
};

export const AccountScreen: FC<AccountScreenProps> = ({
  recent,
  exploreHref,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 1, sm: 3 },
        }}
      >
        <HeaderText>Recent</HeaderText>
        <Box
          sx={{
            px: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {recent.map((d) => (
            <GameIcon key={d.id} size={94} {...d} />
          ))}
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between" width="100%">
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

const HeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontFamily: theme.typography.dangrek.fontFamily,
}));
