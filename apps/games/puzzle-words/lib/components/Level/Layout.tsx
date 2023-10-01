import { Flex } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';
import { Player } from './Player';
import { GridPaperLayout } from '../Layouts';
import { EnterDirectionally } from '../Animators';

export type LayoutProps = {
  selection: ReactNode;
  builder: ReactNode;
  header: ReactNode;
  puzzle: ReactNode;
  footer: ReactNode;
};

export const Layout: FC<LayoutProps> = (props) => {
  const { header, puzzle } = props;

  return (
    <GridPaperLayout>
      <EnterDirectionally y={-50} delay={0.25}>
        <Flex column fullWidth centered pt={2}>
          {header}
        </Flex>
      </EnterDirectionally>
      <Flex fill centered py={1}>
        <EnterDirectionally delay={0.25}>{puzzle}</EnterDirectionally>
      </Flex>
      <Flex fullWidth centered pb={2} top={0}>
        <Player {...props} />
      </Flex>
    </GridPaperLayout>
  );
};
