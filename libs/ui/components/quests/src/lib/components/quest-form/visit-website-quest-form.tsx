import { OpenInNew } from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';
import { useState } from 'react';

import { isQuestComplete, selectQuestColor } from '../../util';

export const VisitWebsiteQuestForm: React.FC<{
  quest: DetailedQuestSchema<'VISIT_WEBSITE'>;
  actions: QuestFormActions<'VISIT_WEBSITE'>;
}> = ({ quest, actions }) => {
  const complete = isQuestComplete(quest.status);
  const colorKey = selectQuestColor(quest.status);
  const [clicked, setClicked] = useState(false);
  const { url } = quest.data;
  return (
    <Column gap={2} alignItems="center">
      <Link
        position="relative"
        width={{ xs: '100%', sm: '80%' }}
        onClick={() => setClicked(true)}
        target="_blank"
        href={url}
      >
        <ResponsiveImage src={quest.data.preview} alt="Website Preview" />
      </Link>
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
