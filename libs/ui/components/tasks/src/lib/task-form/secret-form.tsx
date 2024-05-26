import { Button, Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { TaskFormProps } from '@worksheets/util/tasks';
import { useState } from 'react';

import { BaseTextField } from './custom-input-form';

export const SecretForm = ({ task, actions }: TaskFormProps) => {
  if (task.status === 'COMPLETED') {
    return <CompletedForm />;
  }

  return <Form task={task} actions={actions} />;
};

const CompletedForm: React.FC = () => {
  return (
    <Column gap={0.75}>
      <Typography variant="body2" fontWeight={700}>
        Task Complete
      </Typography>
      <Typography variant="body2">The secret is safe with us.</Typography>
    </Column>
  );
};

const Form: React.FC<TaskFormProps> = ({ task, actions }) => {
  const [secret, setSecret] = useState('');
  const handleSubmit = () => {
    actions.onSubmit({
      repetitions: 1,
      state: {
        secret,
      },
    });
  };
  return (
    <Column gap={2} mt={0.5}>
      <BaseTextField
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        label={'Secret Code'}
        description="Enter the secret code to complete the task."
      />
      <Button variant="arcade" size="small" onClick={handleSubmit}>
        Submit
      </Button>
    </Column>
  );
};
