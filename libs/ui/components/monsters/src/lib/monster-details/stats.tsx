import { Collapse } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import {
  MOB_ELEMENT_LABEL,
  MOB_RACE_LABEL,
  MOB_SIZE_LABEL,
  MonsterSchema,
} from '@worksheets/util/types';
import { useEffect, useState } from 'react';

import { Data } from './data';
import { Header } from './header';
import { BORDER_KEY } from './styles';

export const Statistics: React.FC<MonsterSchema> = (monster) => {
  const isMobile = useMediaQueryDown('sm');
  const [open, setOpen] = useState(false);
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
          <Data label={'Max HP'} value={monster.maxHp} />
          <Data label={'Level'} value={monster.level} />
          <Data label={'Race'} value={MOB_RACE_LABEL[monster.race]} />
          <Data label={'Element'} value={MOB_ELEMENT_LABEL[monster.element]} />
          <Data label={'Size'} value={MOB_SIZE_LABEL[monster.size]} />
          <Data label={'Attack'} value={monster.attack} />
          <Data label={'Defense'} value={monster.defense} />
          <Data label={'Base Exp'} value={monster.baseExp} />
          <Data label={'MVP Exp'} value={monster.mvpExp} />
          <Data label={'Loot'} value={monster.loot.length} />
        </Column>
      </Collapse>
    </Column>
  );
};
