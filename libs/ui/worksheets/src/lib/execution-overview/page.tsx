import WebsiteLayout from '../website-layout';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { trpc } from '@worksheets/trpc/ide';
import { VerticalResizerLayout } from '../shared/resizable-layout/vertical-resizer-layout';
import { HorizontalResizerLayout } from '../shared/resizable-layout/horizontal-resizer-layout';
import { useRouter } from 'next/router';
import React from 'react';
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
import { OpenInNewTabLink } from '../shared/open-in-new-tab-link';

export const ExecutionOverviewPage: React.FC<{
  worksheetId: string;
  executionId: string;
}> = ({ executionId, worksheetId }) => {
  const { back } = useRouter();
  // get the task
  const { data: execution } = trpc.worksheets.tasks.execution.useQuery(
    { executionId },
    {
      enabled: !!executionId,
      refetchInterval: 5000,
      refetchIntervalInBackground: false,
    }
  );
  // get the execution

  const { data: worksheet } = trpc.worksheets.get.useQuery(
    { worksheetId },
    {
      enabled: !!worksheetId,
    }
  );

  return (
    <WebsiteLayout>
      <Box height="100%" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" gap={3} margin={1}>
          <IconButton onClick={() => back()}>
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
                <LogsViewer
                  worksheetId={worksheetId}
                  executionId={executionId}
                />
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
}> = ({ worksheet, execution }) => (
  <Box height="100%" width="100%" overflow="scroll">
    <Box
      px={2}
      height="48px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h6">Overview</Typography>
      <Button
        href={`/worksheets/${worksheet?.id}/execute?replayId=${execution?.id}`}
        startIcon={<PlayArrowOutlined />}
        variant="contained"
        size="small"
      >
        Replay
      </Button>
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
      <ConfigurationOption
        label={'Last updated'}
        tooltip="The last updated time is a completed task's termination time"
        content={formatTimestampLong(execution?.updatedAt)}
      />
      <ConfigurationOption
        label={'Processing time'}
        content={prettyPrintMilliseconds(execution?.duration ?? 0)}
      />
      {execution?.createdAt && (
        <ConfigurationOption
          label={'Run time'}
          content={prettyPrintMilliseconds(
            (execution.updatedAt ?? Date.now()) - execution.createdAt
          )}
        />
      )}
      <ConfigurationOption
        label={'Worksheet ID'}
        content={
          <Typography variant="body2">
            <OpenInNewTabLink
              href={`/worksheets/${worksheet?.id}`}
              fontSize={14}
            >
              {worksheet?.id}
            </OpenInNewTabLink>
          </Typography>
        }
      />
      <ConfigurationOption label={'Worksheet Name'} content={worksheet?.name} />
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

const LogsViewer: React.FC<{ worksheetId: string; executionId: string }> = (
  props
) => {
  return (
    <Box width="100%" height="100%">
      <LogList {...props} refetchInterval={2000} />
    </Box>
  );
};
