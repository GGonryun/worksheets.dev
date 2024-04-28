import { Collapse } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { MonsterSchema, separateLoot } from '@worksheets/util/types';
import React, { useEffect } from 'react';

import { Header } from '../header';
import { Banner } from './banner';
import { Item } from './item';

export const Loot: React.FC<MonsterSchema> = (mob) => {
  const [open, setOpen] = React.useState(false);
  const isSmall = useMediaQueryDown('md');
  useEffect(() => {
    setOpen(!isSmall);
  }, [isSmall]);

  const { basicLoot, mvpLoot } = separateLoot(mob.loot);

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
            {basicLoot.map((loot) => (
              <Item key={loot.item.id} {...loot} />
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
            {mvpLoot.slice(0, 1).map((loot) => (
              <Item key={loot.item.id} {...loot} />
            ))}
          </Row>
        </Column>
      </Collapse>
    </Column>
  );
};
