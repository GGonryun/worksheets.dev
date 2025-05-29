import { ContestSchema } from '@worksheets/util/types';

import { ContestGroup } from './contest-group';

export const ContestContents: React.FC<{
  list: ContestSchema[];
}> = ({ list }) => {
  return <ContestGroup title={'Contests'} contests={list} />;
};
