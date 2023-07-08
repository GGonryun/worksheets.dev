import WebsiteLayout from '../website-layout';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  Link,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { trpc } from '@worksheets/trpc/ide';
import { VerticalResizerLayout } from '../shared/resizable-layout/vertical-resizer-layout';
import { HorizontalResizerLayout } from '../shared/resizable-layout/horizontal-resizer-layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { JSONViewer } from '../execute-worksheet/json-viewer';
import { YAMLViewer } from '../execute-worksheet/yaml-viewer';
import { ConfigurationOption } from '../shared/configuration-option';
import { WorksheetEntity } from '@worksheets/data-access/worksheets';
import { TaskEntity } from '@worksheets/data-access/tasks';
import { TaskExecutionStatusChip } from '../shared/task-execution-status-chip';
import {
  formatTimestampLong,
  prettyPrintMilliseconds,
  printCountdownDuration,
} from '@worksheets/util/time';
import { PlayArrowOutlined } from '@mui/icons-material';
import { LogLevelVerbosityChip } from '../shared/log-level-verbosity-chip';
import { LogList } from '../worksheet-details/log-list/log-list';
import { useUser } from '@worksheets/util/auth/client';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDebounce } from '@worksheets/ui/common';

export const ExecutionOverviewPage: React.FC<{
  worksheetId: string;
  executionId: string;
}> = ({ executionId, worksheetId }) => {
  const { push } = useRouter();
  const { user } = useUser();

  // get the task
  const { data: execution, isLoading: isExecutionLoading } =
    trpc.worksheets.tasks.execution.useQuery(
      { executionId },
      {
        enabled: !!executionId && !!user,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );

  // get the execution
  const { data: worksheet, isLoading: isWorksheetLoading } =
    trpc.worksheets.get.useQuery(
      { worksheetId },
      {
        enabled: !!worksheetId && !!user,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );

  return (
    <WebsiteLayout>
      <Box height="100%" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" gap={3} margin={1}>
          <IconButton
            onClick={() => push(`/worksheets/${worksheetId}/executions`)}
          >
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography variant="h6">Execution details</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="h6" py={1} px={3}>
            {worksheet?.name}: {execution?.id}
          </Typography>
        </Box>
        <Divider />
        <VerticalResizerLayout
          panels={[
            {
              content: (
                <HorizontalResizerLayout
                  panels={[
                    {
                      content: (
                        <VerticalResizerLayout
                          panels={[
                            {
                              content: (
                                <TaskExecutionSummary
                                  isLoading={
                                    isWorksheetLoading || isExecutionLoading
                                  }
                                  worksheet={worksheet}
                                  execution={execution}
                                />
                              ),
                            },
                            {
                              content: (
                                <HorizontalResizerLayout
                                  panels={[
                                    {
                                      content: (
                                        <JSONViewer
                                          title={'Input'}
                                          value={JSON.stringify(
                                            execution?.input ?? {},
                                            null,
                                            2
                                          )}
                                        />
                                      ),
                                    },
                                    {
                                      content: (
                                        <JSONViewer
                                          title={'Output'}
                                          value={JSON.stringify(
                                            execution?.output ?? {},
                                            null,
                                            2
                                          )}
                                        />
                                      ),
                                    },
                                  ]}
                                />
                              ),
                            },
                          ]}
                        />
                      ),
                    },
                    {
                      content: <YAMLViewer worksheet={worksheet} />,
                      defaultSize: 40,
                    },
                  ]}
                />
              ),
              defaultSize: 65,
            },
            {
              content: (
                <LogsViewer worksheet={worksheet} execution={execution} />
              ),
            },
          ]}
        />
      </Box>
    </WebsiteLayout>
  );
};

const TaskExecutionSummary: React.FC<{
  worksheet?: WorksheetEntity;
  execution?: TaskEntity;
  isLoading?: boolean;
}> = ({ worksheet, execution, isLoading }) => {
  const [allowRefresh, setAllowRefresh] = useState(false);
  const utils = trpc.useContext();
  const isDone = !!execution?.finishedAt;
  const refreshTooltip = isDone
    ? 'Task is finished'
    : allowRefresh
    ? 'Waiting for new data...'
    : 'Click to refresh';

  useEffect(() => {
    if (isDone) {
      setAllowRefresh(true);
    }
  }, [isDone]);

  const stopLoading = useDebounce(6000, () => {
    setAllowRefresh(false);
  });

  if (isLoading) {
    return (
      <Box
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box height="100%" width="100%" overflow="scroll">
      <Box
        px={2}
        height="48px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6">Overview</Typography>
        <Box display="flex" alignItems="center" gap={3}>
          <Tooltip
            placement="top"
            title={refreshTooltip}
            disableHoverListener={!allowRefresh}
          >
            <span>
              <Button
                variant={allowRefresh ? 'contained' : 'outlined'}
                disabled={allowRefresh}
                color="primary"
                onClick={() => {
                  setAllowRefresh(true);
                  stopLoading();

                  utils.worksheets.get.invalidate({
                    worksheetId: worksheet?.id,
                  });
                  utils.worksheets.tasks.execution.invalidate({
                    executionId: execution?.id,
                  });
                  utils.worksheets.logs.get.invalidate({
                    worksheetId: worksheet?.id,
                    executionId: execution?.id,
                  });
                }}
                startIcon={<RefreshIcon />}
                size="small"
              >
                {isDone ? 'Finished' : 'Refresh'}
              </Button>
            </span>
          </Tooltip>
          <Button
            href={`/worksheets/${worksheet?.id}/execute?replayId=${execution?.id}`}
            startIcon={<PlayArrowOutlined />}
            variant="contained"
            size="small"
          >
            Replay
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box py={2} px={4} display="flex" flexDirection="column" gap={1}>
        <ConfigurationOption label={'Execution ID'} content={execution?.id} />
        <ConfigurationOption
          label={'Execution state'}
          content={<TaskExecutionStatusChip state={execution?.state} />}
        />
        <ConfigurationOption
          label={'Time started'}
          content={formatTimestampLong(execution?.createdAt)}
        />

        {execution?.finishedAt ? (
          <ConfigurationOption
            label={'Finished at'}
            tooltip="Updates when a task has finished running"
            content={formatTimestampLong(execution?.finishedAt)}
          />
        ) : (
          <ConfigurationOption
            label={'Last updated'}
            content={formatTimestampLong(execution?.updatedAt)}
          />
        )}
        <ConfigurationOption
          label={'Processing time'}
          content={prettyPrintMilliseconds(execution?.duration ?? 0)}
        />

        {(execution?.finishedAt || execution?.updatedAt) && (
          <ConfigurationOption
            label={`${execution.finishedAt ? 'Total' : 'Current'} run time`}
            content={prettyPrintMilliseconds(
              (execution?.finishedAt || execution?.updatedAt) -
                execution.createdAt
            )}
          />
        )}
        <ConfigurationOption
          label={'Worksheet ID'}
          content={
            <Typography variant="body2">
              <Link href={`/worksheets/${worksheet?.id}`}>{worksheet?.id}</Link>
            </Typography>
          }
        />
        <ConfigurationOption
          label={'Worksheet Name'}
          content={worksheet?.name}
        />
        <ConfigurationOption
          label={'Log Level'}
          content={
            <LogLevelVerbosityChip
              verbosity={execution?.verbosity ?? worksheet?.logLevel}
            />
          }
        />
        <ConfigurationOption
          label={'Timeout'}
          content={printCountdownDuration({
            seconds: execution?.timeout ?? worksheet?.timeout,
          })}
        />
      </Box>
    </Box>
  );
};

const LogsViewer: React.FC<{
  execution?: TaskEntity;
  worksheet?: WorksheetEntity;
}> = (props) => {
  return (
    <Box width="100%" height="100%">
      <LogList
        executionId={props.execution?.id}
        worksheetId={props.worksheet?.id}
        disableRefresh={!!props.execution?.finishedAt}
        disableTooltip={'Task is finished'}
      />
    </Box>
  );
};
