import { Flex } from '@worksheets/ui-core';
import { EnterDirectionally } from '../../Animators';
import { MissionStatement } from './MissionStatement';
import { MoreGames } from './MoreGames';
import { FC } from 'react';
import { Subscribe } from '../Subscribe';

export type FooterProps = { onShowMissionStatement: () => void };
export const Footer: FC<FooterProps> = (props) => (
  <Flex alignItems="flex-end" flex={1}>
    <Flex column gap={2} fullWidth>
      <EnterDirectionally delay={0.75}>
        <Subscribe />
      </EnterDirectionally>
      <Flex wrap centered gap={2}>
        <EnterDirectionally delay={0.25}>
          <MoreGames />
        </EnterDirectionally>
        <EnterDirectionally delay={0.5}>
          <MissionStatement {...props} />
        </EnterDirectionally>
      </Flex>
    </Flex>
  </Flex>
);
