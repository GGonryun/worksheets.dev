import { OpenInNew } from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { QuestFormActions, VisitWebsiteQuest } from '@worksheets/util/types';
import { useState } from 'react';

import { isQuestComplete, selectQuestColor } from '../../util';

export const VisitWebsiteQuestForm: React.FC<{
  quest: VisitWebsiteQuest;
  actions: QuestFormActions<'VISIT_WEBSITE'>;
}> = ({ quest, actions }) => {
  const complete = isQuestComplete(quest);
  const colorKey = selectQuestColor(quest);
  const [clicked, setClicked] = useState(false);
  const { url } = quest.data;
  return (
    <Column gap={2}>
      {complete && (
        <Link href={url} target="_blank">
          <Row gap={0.5}>
            <OpenInNew
              sx={{
                fontSize: (theme) => theme.typography.body1.fontSize,
              }}
            />
            <Typography variant="body2" fontWeight={500}>
              Visit Website Again
            </Typography>
          </Row>
        </Link>
      )}
      {clicked ? (
        <Button
          variant="arcade"
          color="warning"
          fullWidth
          onClick={() => actions.onSubmit({})}
        >
          Collect Reward
        </Button>
      ) : (
        <Button
          variant="arcade"
          color={colorKey}
          startIcon={complete ? undefined : <OpenInNew />}
          href={url}
          target="_blank"
          onClick={() => setClicked(true)}
          disabled={complete}
        >
          {complete ? 'Quest Complete' : 'Visit Website'}
        </Button>
      )}
    </Column>
  );
};