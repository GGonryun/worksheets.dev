import { OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { RaffleParticipationQuest } from '@worksheets/util/types';

import { isQuestComplete, selectQuestColor } from '../../util';

export const RaffleParticipationQuestForm: React.FC<{
  quest: RaffleParticipationQuest;
}> = ({ quest }) => {
  const complete = isQuestComplete(quest);
  const colorKey = selectQuestColor(quest);

  return (
    <Column>
      <Button
        variant="arcade"
        color={colorKey}
        fullWidth
        startIcon={complete ? undefined : <OpenInNew />}
        href={routes.raffles.path()}
        target="_blank"
      >
        {complete ? 'Quest Complete' : 'Join a Raffle'}
      </Button>
    </Column>
  );
};
