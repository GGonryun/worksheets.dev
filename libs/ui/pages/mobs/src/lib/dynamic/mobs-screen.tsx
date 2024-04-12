import {
  ArrowDropDown,
  ArrowDropUp,
  Clear,
  History,
  Search,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
  TypographyProps,
} from '@mui/material';
import {
  SortAmountDown,
  Sword,
  Undo,
} from '@worksheets/icons/font-awesome-solid';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage, FillImage } from '@worksheets/ui/components/images';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { calculatePercentage } from '@worksheets/util/numbers';
import React, { useEffect } from 'react';

const BORDER_KEY = '1px solid grey';
const BORDER_KEY_2 = '2px solid grey';

type Mob = {
  fightId: number;
  mobId: number;
  name: string;
  image: string;
  hp: {
    max: number;
    current: number;
  };
  level: number;
  race: string;
  property: string;
  size: string;
  attack: number;
  defense: number;
  exp: {
    base: number;
    mvp: number;
  };
};

const MOBS = [
  {
    fightId: 1,
    mobId: 1511,
    name: 'Amon Ra',
    image: 'https://cdn.charity.games/_mobs/1511.gif',
    hp: {
      max: 1214138,
      current: 1214138,
    },
    level: 88,
    race: 'Demi-Human',
    property: 'Earth 3',
    size: 'Large',
    attack: 164,
    defense: 12,
    exp: {
      base: 87264,
      mvp: 43632,
    },
  },
  {
    fightId: 2,
    mobId: 1583,
    name: 'Tao Gunka',
    image: 'https://cdn.charity.games/_mobs/1583.gif',
    hp: {
      max: 193000,
      current: 121138,
    },
    level: 70,
    race: 'Demon',
    property: 'Neutral 3',
    size: 'Large',
    attack: 300,
    defense: 10,
    exp: {
      base: 87264,
      mvp: 43632,
    },
  },
];

type ItemDetails = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  quantity: number;
};

const ITEMS: ItemDetails[] = [
  {
    id: 'tokens',
    name: 'Tokens',
    type: 'Currency',
    description: 'The primary currency of the arcade',
    image: 'https://cdn.charity.games/_items/7606.gif',
    quantity: 2,
  },
  {
    id: 'steam-key',
    name: 'Steam Key',
    type: 'Consumable',
    description: 'A key that unlocks a game on Steam',
    image: 'https://cdn.charity.games/_items/7459.gif',
    quantity: 1,
  },
  {
    id: 'small-box-of-tokens',
    name: 'Small Box of Tokens',
    type: 'Consumable',
    description: 'A small box containing 20 tokens',
    image: 'https://cdn.charity.games/_items/12339.gif',
    quantity: 3,
  },
];

export const DynamicMobsScreen = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Paper
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.palette.background.paper,
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: 2,
        }}
      >
        <Column alignItems="center" gap={2}>
          <MobsOrder />

          {MOBS.map((mob) => (
            <MobOverview key={mob.fightId} {...mob} />
          ))}
        </Column>
      </Paper>
    </Container>
  );
};

const MobsOrder = () => (
  <Column width="100%">
    <Row justifyContent="space-between" px={1}>
      <GradientShadowedTypography
        typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
        textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
      >
        Boss Fights
      </GradientShadowedTypography>
      <Row gap={1}>
        <Button variant="square" size="small" color="primary">
          <Sword />
        </Button>
        <Button variant="square" size="small" color="primary">
          <History />
        </Button>
      </Row>
    </Row>
    <br />
    <Row justifyContent="space-between" flexWrap="wrap" gap={1}>
      <Box maxWidth={{ xs: '100%', sm: '300px' }} width="100%">
        <Typography
          fontWeight={500}
          color={(theme) => theme.palette.text.blue.darker}
        >
          Search
        </Typography>
        <TextField
          size="small"
          fullWidth
          sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box maxWidth={{ xs: '100%', sm: '300px' }} width="100%">
        <Typography
          fontWeight={500}
          color={(theme) => theme.palette.text.blue.darker}
        >
          Show current results by:
        </Typography>
        <Row gap={1}>
          <Select
            size="small"
            fullWidth
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
            }}
          />
          <Button variant="square" sx={{ mt: '-2px' }}>
            <SortAmountDown />
          </Button>
          <Button variant="square" sx={{ mt: '-2px' }}>
            <Undo />
          </Button>
        </Row>
      </Box>
    </Row>
  </Column>
);

const MobOverview: React.FC<Mob> = (mob) => {
  return <Table {...mob} />;
};

const TitleBar: React.FC<Mob> = (mob) => (
  <Box
    sx={{
      display: { xs: 'flex', sm: 'grid' },
      justifyContent: { xs: 'space-between', sm: 'unset' },
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 0.5fr' },
      backgroundColor: (theme) => theme.palette.background['solid-blue'],
    }}
    gap={1}
    py={{ xs: 0.5, sm: 1 }}
    px={{ xs: 1, sm: 2 }}
  >
    <Typography variant="body1" fontWeight={900} color="text.arcade">
      {mob.name}
    </Typography>

    <Typography variant="body1" fontWeight={900} color="text.arcade">
      Boss Fight #{mob.fightId}
    </Typography>

    <Typography
      variant="body1"
      fontWeight={900}
      color="text.arcade"
      textAlign="center"
      display={{ xs: 'none', md: 'block' }}
    >
      Resistances
    </Typography>
  </Box>
);

const Table: React.FC<Mob> = (mob) => (
  <Box
    sx={{
      width: '100%',
      border: BORDER_KEY_2,
      borderRadius: (theme) => theme.shape.borderRadius,
      overflow: 'hidden',
      backgroundColor: (theme) => theme.palette.background.soft,
    }}
  >
    <TitleBar {...mob} />
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 0.5fr' },
      }}
    >
      <Box
        sx={{
          gridRow: { xs: 0, sm: 1 },
          borderRight: { xs: 'none', sm: BORDER_KEY },
          borderTop: { xs: BORDER_KEY, sm: 'none' },
        }}
      >
        <Stats {...mob} />
      </Box>
      <Box sx={{ gridRow: { xs: 1, sm: 0 } }}>
        <Profile {...mob} />
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          borderLeft: BORDER_KEY,
        }}
      >
        <Elements {...mob} />
      </Box>
    </Box>
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        borderTop: BORDER_KEY,
      }}
    >
      <Elements {...mob} />
    </Box>
    <Loot />
  </Box>
);

const Stats: React.FC<Mob> = (mob) => {
  const isMobile = useMediaQueryDown('sm');
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Column width="100%">
      <Header
        open={open}
        onClick={() => setOpen(!open)}
        visible={{ xs: true, sm: false }}
      >
        Stats
      </Header>
      <Collapse in={open}>
        <Column
          sx={{
            '& > div': {
              borderBottom: BORDER_KEY,
            },
            '& > div:last-child': {
              borderBottom: 'none',
            },
          }}
        >
          <Data label={'Max HP'} value={mob.hp.max} />
          <Data label={'Current HP'} value={mob.hp.current} />
          <Data label={'Level'} value={mob.level} />
          <Data label={'Race'} value={mob.race} />
          <Data label={'Property'} value={mob.property} />
          <Data label={'Size'} value={mob.size} />
          <Data label={'Attack'} value={mob.attack} />
          <Data label={'Defense'} value={mob.defense} />
          <Data label={'Base Exp'} value={mob.exp.base} />
          <Data label={'MVP Exp'} value={mob.exp.mvp} />
        </Column>
      </Collapse>
    </Column>
  );
};

const Data: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <Row justifyContent="space-between" component="div">
    <DataCell
      fontWeight={900}
      variant="body2"
      sx={{
        borderRight: BORDER_KEY,
        color: (theme) => theme.palette.text.blue.darker,
        backgroundColor: (theme) =>
          alpha(theme.palette.background['solid-blue'], 0.2),
      }}
    >
      {label}
    </DataCell>
    <DataCell
      variant="body3"
      textAlign="right"
      sx={{
        color: (theme) => theme.palette.text.blue.darker,
      }}
    >
      {value}
    </DataCell>
  </Row>
);

const DataCell = styled((props: TypographyProps) => (
  <Typography fontWeight={500} {...props} />
))(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.5, 1),
}));

const Profile: React.FC<Mob> = (mob) => (
  <Box
    sx={{
      height: '100%',
      width: '100%',
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      p: { xs: 4, sm: 2 },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <LinearProgress
        variant="determinate"
        color="error"
        value={calculatePercentage(mob.hp.current, mob.hp.max)}
        sx={{
          height: 10,
        }}
      />
    </Box>
    <Box
      position="relative"
      minWidth={150}
      minHeight={150}
      maxWidth={300}
      maxHeight={300}
    >
      <ContainImage src={mob.image} alt={mob.name} />
    </Box>
    <Box
      sx={{
        position: 'absolute',
        bottom: 8,
        right: 8,
      }}
    >
      <Button variant="arcade" color="error" size="small">
        Fight
      </Button>
    </Box>
  </Box>
);

const Header: React.FC<
  TypographyProps & {
    open?: boolean;
    onClick: () => void;
    visible?: { xs?: boolean; sm?: boolean; md?: boolean };
  }
> = ({ open, visible, onClick, ...props }) => {
  const Icon = open ? ArrowDropUp : ArrowDropDown;
  return (
    <Row
      justifyContent="center"
      onClick={onClick}
      sx={{
        display: visible
          ? {
              xs: visible.xs ? 'flex' : 'none',
              sm: visible.sm ? 'flex' : 'none',
              md: visible.md ? 'flex' : 'none',
            }
          : 'flex',
        backgroundColor: (theme) => theme.palette.background['solid-blue'],
      }}
    >
      <Typography
        variant="body2"
        {...props}
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          color: (theme) => theme.palette.text.arcade,
          padding: (theme) => theme.spacing(0.25, 0.5),
        }}
      />
      <Icon
        sx={{
          color: (theme) => theme.palette.text.arcade,
        }}
      />
    </Row>
  );
};
const Banner = styled((props: TypographyProps) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 900,
  color: theme.palette.text.red.light,
  padding: theme.spacing(0.25, 0.5),
  backgroundColor: alpha(theme.palette.background['solid-blue'], 0.1),
}));

const Elements: React.FC<Mob> = (mob) => {
  const isSmall = useMediaQueryDown('md');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!isSmall) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isSmall]);

  return (
    <Box borderBottom={BORDER_KEY}>
      <Header
        open={open}
        onClick={() => setOpen(!open)}
        visible={{ xs: true, sm: true, md: false }}
      >
        Resistances
      </Header>

      <Collapse in={open}>
        <Box
          width="100%"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              sm: '1fr 1fr',
              md: '1fr',
            },
            '& > div': {
              borderBottom: { xs: BORDER_KEY, md: 'BORDER_KEY' },
            },
            '& > div:last-child': {
              borderBottom: 'none',
            },
            '& > div:nth-child(odd)': {
              borderRight: { xs: BORDER_KEY, md: 'none' },
            },
            '& > div:nth-child(9)': {
              borderBottom: { xs: 'none', md: BORDER_KEY },
            },
          }}
        >
          <Data label="Neutral" value={'100%'} />
          <Data label="Water" value={'100%'} />
          <Data label="Earth" value={'100%'} />
          <Data label="Fire" value={'100%'} />
          <Data label="Wind" value={'100%'} />
          <Data label="Poison" value={'100%'} />
          <Data label="Holy" value={'100%'} />
          <Data label="Shadow" value={'100%'} />
          <Data label="Ghost" value={'100%'} />
          <Data label="Undead" value={'100%'} />
        </Box>
      </Collapse>
    </Box>
  );
};

const Loot: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const isSmall = useMediaQueryDown('md');
  useEffect(() => {
    setOpen(!isSmall);
  }, [isSmall]);

  return (
    <Column>
      <Header open={open} onClick={() => setOpen(!open)}>
        All Loot
      </Header>
      <Collapse in={open}>
        <Column my={1} mx={2}>
          <Banner>Basic Loot</Banner>
          <Row
            columnGap={5}
            rowGap={2}
            justifyContent="space-evenly"
            flexWrap="wrap"
            p={1}
          >
            {ITEMS.map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </Row>
          <Banner>MVP Loot</Banner>
          <Row
            columnGap={5}
            rowGap={2}
            justifyContent="space-evenly"
            flexWrap="wrap"
            p={1}
          >
            {ITEMS.slice(0, 1).map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </Row>
        </Column>
      </Collapse>
    </Column>
  );
};

const Item: React.FC<ItemDetails> = (item) => (
  <Row gap={0.5}>
    <Box position="relative" height={20} width={20}>
      <FillImage src={item.image} alt={item.name} />
    </Box>
    <Typography variant="body2" fontWeight={500}>
      {item.quantity}x {item.name} (100%)
    </Typography>
  </Row>
);
