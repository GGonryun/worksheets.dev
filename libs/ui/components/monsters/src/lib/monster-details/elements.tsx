import { Box, Collapse } from '@mui/material';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { toPercentage } from '@worksheets/util/numbers';
import { MOB_ELEMENT_RESISTANCES, MonsterSchema } from '@worksheets/util/types';
import React, { useEffect } from 'react';

import { Data } from './data';
import { Header } from './header';
import { BORDER_KEY } from './styles';

export const Elements: React.FC<MonsterSchema> = (mob) => {
  const isSmall = useMediaQueryDown('md');
  const [open, setOpen] = React.useState(false);
  const resistances = MOB_ELEMENT_RESISTANCES[mob.element];

  useEffect(() => {
    if (!isSmall) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isSmall]);

  return (
    <Box>
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
              borderBottom: BORDER_KEY,
            },
            '& > div:last-child': {
              borderBottom: 'none',
            },
            '& > div:nth-of-type(odd)': {
              borderRight: { xs: BORDER_KEY, md: 'none' },
            },
            '& > div:nth-of-type(9)': {
              borderBottom: { xs: 'none', md: BORDER_KEY },
            },
          }}
        >
          <Resistance label="Neutral" resistance={resistances.neutral} />
          <Resistance label="Water" resistance={resistances.water} />
          <Resistance label="Earth" resistance={resistances.earth} />
          <Resistance label="Fire" resistance={resistances.fire} />
          <Resistance label="Wind" resistance={resistances.wind} />
          <Resistance label="Poison" resistance={resistances.poison} />
          <Resistance label="Holy" resistance={resistances.holy} />
          <Resistance label="Shadow" resistance={resistances.shadow} />
          <Resistance label="Ghost" resistance={resistances.ghost} />
          <Resistance label="Undead" resistance={resistances.undead} />
        </Box>
      </Collapse>
    </Box>
  );
};

const Resistance: React.FC<{ label: string; resistance: number }> = ({
  label,
  resistance,
}) => (
  <Data
    label={label}
    value={toPercentage(resistance)}
    color={resistance > 1 ? 'success' : resistance < 1 ? 'error' : undefined}
  />
);
