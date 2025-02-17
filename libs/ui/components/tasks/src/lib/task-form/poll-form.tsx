import { Button, LinearProgress, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { toPercentage } from '@worksheets/util/numbers';
import {
  parseTaskPollData,
  TaskFormProps,
  TaskPollResult,
} from '@worksheets/util/tasks';
import { useState } from 'react';

import { BaseChoiceField } from './custom-input-form';

export const PollForm: React.FC<TaskFormProps> = ({ task, actions }) => {
  if (task.status === 'COMPLETED') {
    return <CompletedForm task={task} />;
  }

  return <Form task={task} actions={actions} />;
};

const CompletedForm: React.FC<Pick<TaskFormProps, 'task'>> = ({ task }) => {
  const results = trpc.user.tasks.poll.results.useQuery(task);

  if (results.isPending) {
    return <PulsingLogo message={'Generating poll results...'} />;
  }

  if (results.isError) {
    return <Typography color="error">{results.error.message}</Typography>;
  }

  const vote = results.data.find((r) => r.key === task.state.answer);

  return (
    <Column mb={1}>
      <Typography variant="body1" fontWeight={700}>
        {task.data.question}
      </Typography>
      <Typography variant="body3">
        Total Votes: {results.data.reduce((acc, { count }) => acc + count, 0)}
      </Typography>
      <Column gap={0.5} my={1.5}>
        {results.data.map((result) => (
          <PollAnswer key={result.key} result={result} vote={vote} />
        ))}
      </Column>
      <Typography variant="body3">
        You voted for: <b>{vote?.label}</b>
      </Typography>
    </Column>
  );
};

const PollAnswer: React.FC<{
  result: TaskPollResult;
  vote?: TaskPollResult;
}> = ({ result, vote }) => {
  const { label, percent } = result;
  const matches = vote?.key === result.key;
  return (
    <Column>
      <Typography
        typography={'body3'}
        color={matches ? 'primary.main' : 'text.secondary'}
        fontWeight={matches ? 700 : 400}
      >
        {label} ({toPercentage(percent, 100)})
      </Typography>
      <LinearProgress
        color={matches ? 'primary' : 'dark-grey'}
        variant="determinate"
        value={percent}
        sx={{
          height: 8,
          borderRadius: 4,
        }}
      />
    </Column>
  );
};

const Form: React.FC<TaskFormProps> = ({ task, actions }) => {
  const data = parseTaskPollData(task.data);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    actions.onSubmit({
      repetitions: 1,
      state: {
        answer: data.options.find((o) => o.label === answer)?.key ?? '',
      },
    });
  };
  return (
    <Column gap={2}>
      <BaseChoiceField
        label={data.question}
        value={answer}
        options={data.options.map((o) => o.label)}
        onChange={(e) => setAnswer(e.target.value)}
        description="You can only vote once, and your vote is final."
      />
      <Button variant="arcade" size="small" onClick={handleSubmit}>
        Submit
      </Button>
    </Column>
  );
};
