import { OpenInNew } from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { TaskFormProps } from '@worksheets/util/tasks';
import { useState } from 'react';

import { isTaskComplete, selectTaskColor } from '../util';

export const VisitWebsiteForm: React.FC<TaskFormProps> = ({
  task,
  actions,
}) => {
  const complete = isTaskComplete(task.status);
  const colorKey = selectTaskColor(task.status);
  const [clicked, setClicked] = useState(false);
  const { url } = task.data;
  return (
    <Column gap={2} alignItems="center">
      <Link
        position="relative"
        width={{ xs: '100%', sm: '80%' }}
        onClick={() => setClicked(true)}
        target="_blank"
        href={url}
      >
        <ResponsiveImage src={task.data.preview} alt="Website Preview" />
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
          onClick={() => actions.onSubmit({ repetitions: 1 })}
        >
          Collect Reward
        </Button>
      ) : (
        <Button
          variant="arcade"
          color={colorKey}
          startIcon={complete ? undefined : <OpenInNew />}
          fullWidth
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
