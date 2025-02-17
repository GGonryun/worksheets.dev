import { Box, Button, Typography, useTheme } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { TaskFormProps } from '@worksheets/util/tasks';
import { printDateTime, printTimeRemaining } from '@worksheets/util/time';
import React from 'react';

import { TaskForm } from '../task-form';
import {
  formatTaskCategoryLabel,
  formatTaskFrequencyLabel,
  formatTaskTypeLabel,
  selectTaskColor,
  selectTaskStatusIcon,
} from '../util';

export const TaskModal: React.FC<
  ModalWrapper<
    {
      isPending?: boolean;
      rewards: React.ReactNode;
    } & TaskFormProps
  >
> = (props) => {
  const { task, actions, isPending, rewards, ...modalProps } = props;
  const colorKey = selectTaskColor(task.status);

  return (
    <InfoModal {...modalProps} infoHref={routes.help.path()} color={colorKey}>
      <TaskModalContent
        task={task}
        actions={actions}
        isPending={isPending}
        rewards={rewards}
      />
    </InfoModal>
  );
};

export const TaskModalContent: React.FC<
  TaskFormProps & {
    isPending?: boolean;
    rewards?: React.ReactNode;
  }
> = (props) => {
  const { task, actions, isPending, rewards } = props;
  const { name, description, expiresAt, status } = task;
  const theme = useTheme();
  const Icon = selectTaskStatusIcon(task.status, task.type);
  const colorKey = selectTaskColor(task.status);
  const color = theme.palette[colorKey].main;
  const frequency = formatTaskFrequencyLabel(task.frequency);
  const category = formatTaskCategoryLabel(task.category);
  const type = formatTaskTypeLabel(task.type);

  return (
    <Column width="100%">
      <Column gap={2} mb={2 + (!rewards ? 1.5 : 0)}>
        <Column>
          <Row justifyContent="space-between">
            <Box mb={1}>
              <Button variant="square" color={colorKey} size="small">
                <Icon />
              </Button>
              <Column alignItems="flex-start" pl={5.5} mt={-4.5}>
                <Typography variant="body3" color={color} fontWeight={500}>
                  {category} - {type}
                </Typography>
                <Typography variant="body3" color={color} fontWeight={500}>
                  {frequency} Task
                </Typography>
              </Column>
            </Box>
          </Row>
          <Column alignItems="flex-start" textAlign="left">
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">{description}</Typography>
          </Column>
        </Column>
        {expiresAt && status === 'COMPLETED' && (
          <Typography variant="body2" color="text.secondary">
            This task resets in <b>{printTimeRemaining(expiresAt)}</b> on{' '}
            <b>{printDateTime(expiresAt)}</b>
          </Typography>
        )}
        <Box width="100%" mb={2}>
          {isPending ? (
            <PulsingLogo />
          ) : (
            <TaskForm task={task} actions={actions} />
          )}
        </Box>
      </Column>
    </Column>
  );
};
