import {
  InfoOutlined,
  Inventory2Outlined,
  SportsMmaOutlined,
} from '@mui/icons-material';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { Row } from '@worksheets/ui/components/flex';
import { MonsterProfile } from '@worksheets/ui/components/monsters';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { MonsterSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

const Screen: React.FC<{ monsters: MonsterSchema[] }> = (props) => (
  <Container
    maxWidth="md"
    sx={{
      py: 4,
    }}
  >
    <Typography
      typography={{ xs: 'h4', mobile2: 'h3', md: 'h2' }}
      sx={{ textAlign: 'center' }}
      color="text.arcade"
      gutterBottom
    >
      Monster Database
    </Typography>
    <Row justifyContent="space-evenly" flexWrap="wrap" gap={2}>
      <Button
        href={playRoutes.items.path()}
        sx={{ width: { xs: '100%', sm: '225px' } }}
        variant="arcade"
        color="warning"
        startIcon={<Inventory2Outlined />}
      >
        Items Database
      </Button>
      <Button
        href={playRoutes.battles.path()}
        sx={{ width: { xs: '100%', sm: '225px' } }}
        variant="arcade"
        color="error"
        startIcon={<SportsMmaOutlined />}
      >
        Boss Battles
      </Button>
    </Row>
    <Box
      sx={{
        mt: 4,
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          mobile1: 'repeat(auto-fill, minmax(150px, 1fr))',
          sm: 'repeat(auto-fill, minmax(200px, 1fr))',
        },
        gridAutoRows: 200,
        gap: 2,
      }}
    >
      {props.monsters.map((monster) => (
        <MonsterBox key={monster.id} monster={monster} />
      ))}
    </Box>
  </Container>
);

export const MonsterBox: React.FC<{ monster: MonsterSchema }> = (props) => {
  return (
    <Paper
      component={Link}
      href={playRoutes.monster.path({
        params: {
          monsterId: props.monster.id,
        },
      })}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <MonsterProfile
        sx={{ mt: 2 }}
        monster={props.monster}
        healthBar={
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontWeight: 900,
              borderTopLeftRadius: (theme) => theme.shape.borderRadius * 3.5,
              borderTopRightRadius: (theme) => theme.shape.borderRadius * 3.5,
              width: '100%',
              color: (theme) => theme.palette.text.arcade,
              padding: (theme) => theme.spacing(0.25, 0.5),
              backgroundColor: (theme) =>
                theme.palette.background['solid-blue'],
            }}
          >
            {props.monster.name}
          </Typography>
        }
        infoButton={
          <Button variant="square" size="small">
            <InfoOutlined />
          </Button>
        }
      />
    </Paper>
  );
};

export const DynamicMonstersScreen = dynamic(() => Promise.resolve(Screen), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
