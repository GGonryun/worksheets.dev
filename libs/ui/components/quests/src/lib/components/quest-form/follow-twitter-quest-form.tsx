import { OpenInNew } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';
import { useState } from 'react';

import { isQuestComplete, selectQuestColor } from '../../util';

export const FollowTwitterQuestForm: React.FC<{
  quest: DetailedQuestSchema<'FOLLOW_TWITTER'>;
  actions: QuestFormActions<'FOLLOW_TWITTER'>;
}> = ({ quest, actions }) => {
  const complete = isQuestComplete(quest.status);
  const colorKey = selectQuestColor(quest.status);

  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState('');
  return (
    <Column>
      {clicked ? (
        <Column gap={2}>
          <Column gap={0.5}>
            <Typography variant="body2" fontWeight={500}>
              Enter your Twitter handle
            </Typography>
            <TextField
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
            />
          </Column>
          <Button
            variant="arcade"
            color="warning"
            fullWidth
            disabled={username.length < 4}
            onClick={() => {
              actions.onSubmit({ username });
              setUsername('');
            }}
          >
            Collect Reward
          </Button>
        </Column>
      ) : (
        <Button
          variant="arcade"
          color={colorKey}
          disabled={complete}
          fullWidth
          startIcon={complete ? undefined : <OpenInNew />}
          href={`https://twitter.com/intent/follow?screen_name=${quest.data.handle}`}
          target="_blank"
          onClick={() => setClicked(true)}
        >
          {complete ? 'Quest Complete' : 'Follow on Twitter'}
        </Button>
      )}
    </Column>
  );
};
