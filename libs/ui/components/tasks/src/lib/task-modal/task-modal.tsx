import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, Typography, useTheme } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { TaskFormProps } from '@worksheets/util/tasks';
import {
  isPast,
  printDateTime,
  printTimeRemaining,
} from '@worksheets/util/time';
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
      isLoading: boolean;
      rewards: React.ReactNode;
    } & TaskFormProps
  >
> = (props) => {
  const { task, actions, isLoading, rewards, ...modalProps } = props;

  return (
    <InfoModal {...modalProps} infoHref={routes.help.quests.path()}>
      <TaskModalContent
        task={task}
        actions={actions}
        isLoading={isLoading}
        rewards={rewards}
      />
    </InfoModal>
  );
};

export const TaskModalContent: React.FC<
  TaskFormProps & {
    isLoading: boolean;
    rewards: React.ReactNode;
  }
> = (props) => {
  const { task, actions, isLoading, rewards } = props;
  const [open, setOpen] = React.useState(false);
  const { name, description, expiresAt } = task;
  const theme = useTheme();
  const Icon = selectTaskStatusIcon(task.status, task.type);
  const colorKey = selectTaskColor(task.status);
  const color = theme.palette[colorKey].main;
  const frequency = formatTaskFrequencyLabel(task.frequency);
  const category = formatTaskCategoryLabel(task.category);
  const type = formatTaskTypeLabel(task.type);

  return (
    <Column width="100%">
      <Column gap={2}>
        <Column>
          <Row justifyContent="space-between">
            <Box mb={1}>
              <Button variant="square" color={colorKey} size="small">
                <Icon />
              </Button>
            </Box>
            <Column alignItems="flex-end" pr={3}>
              <Typography variant="body3" color={color} fontWeight={500}>
                {category} - {type}
              </Typography>
              <Typography variant="body3" color={color} fontWeight={500}>
                {frequency} Quest
              </Typography>
            </Column>
          </Row>
          <Column alignItems="flex-start" textAlign="left">
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">{description}</Typography>
          </Column>
        </Column>
        {expiresAt > 0 && (
          <Typography variant="body2" color="text.secondary">
            {!isPast(expiresAt) ? (
              <>
                This quest resets in <b>{printTimeRemaining(expiresAt)}</b> on{' '}
                <b>{printDateTime(expiresAt)}</b>
              </>
            ) : undefined}
          </Typography>
        )}
        <Box width="100%">
          {isLoading ? (
            <PulsingLogo />
          ) : (
            <TaskForm task={task} actions={actions} />
          )}
        </Box>
        <Button
          onClick={() => setOpen((o) => !o)}
          size="small"
          variant="arcade"
          color="secondary"
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
          sx={{ width: 'fit-content' }}
        >
          View Rewards
        </Button>
      </Column>
      <Collapse in={open}>{rewards}</Collapse>
    </Column>
  );
};
