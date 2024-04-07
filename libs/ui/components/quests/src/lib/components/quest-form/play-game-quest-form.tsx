import { OpenInNew } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { calculatePercentage } from '@worksheets/util/numbers';
import { PlayGameQuest } from '@worksheets/util/types';

import { selectQuestColor } from '../../util';
import { ProgressBar } from './progress-bar';

export const PlayGameQuestForm: React.FC<{
  quest: PlayGameQuest;
}> = ({ quest }) => {
  const colorKey = selectQuestColor(quest);
  return (
    <Column gap={2}>
      <Column gap={0.5}>
        <Row justifyContent="space-between">
          <Typography variant="body3" fontWeight={500}>
            Progress
          </Typography>
          <Typography variant="body3" fontWeight={500}>
            {quest.state.progress}/
            {quest.data.requirement > 0 ? quest.data.requirement : '∞'}
          </Typography>
        </Row>
        <ProgressBar
          value={
            quest.data.requirement > 0
              ? calculatePercentage(
                  quest.state.progress,
                  quest.data.requirement
                )
              : 100
          }
          color={colorKey}
        />
      </Column>
      <Button
        variant="arcade"
        color={colorKey}
        href={routes.play.path()}
        startIcon={<OpenInNew />}
        target="_blank"
      >
        Play Now!
      </Button>
    </Column>
  );
};
