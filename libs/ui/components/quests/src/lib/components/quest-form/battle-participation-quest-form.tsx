import { OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { DetailedQuestSchema } from '@worksheets/util/types';

import { isQuestComplete, selectQuestColor } from '../../util';

export const BattleParticipationQuestForm: React.FC<{
  quest: DetailedQuestSchema<'BATTLE_PARTICIPATION'>;
}> = ({ quest }) => {
  const complete = isQuestComplete(quest.status);
  const colorKey = selectQuestColor(quest.status);

  return (
    <Column>
      <Button
        variant="arcade"
        color={colorKey}
        fullWidth
        startIcon={complete ? undefined : <OpenInNew />}
        href={routes.battles.path()}
        target="_blank"
      >
        {complete ? 'Quest Complete' : 'Join a Battle'}
      </Button>
    </Column>
  );
};
