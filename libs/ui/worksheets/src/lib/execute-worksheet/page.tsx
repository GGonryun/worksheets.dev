import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import WebsiteLayout from '../website-layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { trpc } from '@worksheets/trpc/ide';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { WorksheetEntity } from '@worksheets/data-access/worksheets';
import React, { useEffect, useState } from 'react';
import HelpIcon from '@mui/icons-material/Help';
import { WorksheetLogLevelField } from '../create-a-worksheet/configure/fields/worksheet-log-level';
import { useDebounce, warn } from '@worksheets/ui/common';
import { WorksheetTimeoutField } from '../create-a-worksheet/configure/fields/worksheet-timeout';
import { ExecutionOverrideForm } from '../shared/types';
import { VerticalResizerLayout } from '../shared/resizable-layout/vertical-resizer-layout';
import { HorizontalResizerLayout } from '../shared/resizable-layout/horizontal-resizer-layout';
import { JSONEditor } from './json-editor';
import { YAMLViewer } from './yaml-viewer';

export const ExecuteWorksheetPage: React.FC = () => {
  const { query, push } = useRouter();
  const worksheetId = query.id as string;
  const replayId = query.replayId as string;

  const { data: replay } = trpc.worksheets.tasks.execution.useQuery(replayId, {
    enabled: !!replayId,
  });
  const { data: worksheet } = trpc.worksheets.get.useQuery(
    { id: worksheetId },
    { enabled: !!worksheetId }
  );

  const [input, setInput] = useState('{}');
  const [error, setError] = useState<string | undefined>(undefined);
  const [overrides, setOverrides] = useState<ExecutionOverrideForm>({});

  useEffect(() => {
    setInput(JSON.stringify(replay?.input ?? {}));
  }, [replay]);

  const execute = trpc.tasks.execute.useMutation();

  const validateInput = useDebounce(1500, (input: string) => {
    try {
      JSON.parse(input);
      setError(undefined);
    } catch {
      setError('Failed to parse JSON text');
    }
  });

  useEffect(() => {
    validateInput(input);
  }, [validateInput, input]);

  useEffect(() => {
    setOverrides({
      logLevel: worksheet?.logLevel,
      timeout: worksheet?.timeout,
    });
  }, [worksheet]);

  const tryFormatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(input), null, 2);
      setInput(formatted);
    } catch {
      // ignore
    }
  };

  const handleExecution = async () => {
    if (error) {
      alert('we have an error!');
      return;
    }

    try {
      const id = await execute.mutateAsync({
        worksheetId,
        input: JSON.parse(input),
        overrides,
      });

      push(`/worksheets/${worksheetId}/executions/${id}`);
    } catch (error) {
      warn('Error executing task')(error);
    }
  };

  return (
    <WebsiteLayout>
      <Box display="flex" flexDirection="column" height="100%">
        <PageHeader />
        <Divider />
        <WorksheetHeader worksheet={worksheet} />
        <Divider />
        <Box height="100%">
          <HorizontalResizerLayout
            panels={[
              {
                content: (
                  <Box height="100%" width={'100%'}>
                    <VerticalResizerLayout
                      panels={[
                        {
                          content: (
                            <JSONEditor
                              title="Input"
                              value={input}
                              onChange={setInput}
                              error={error}
                              onFormat={tryFormatJson}
                              onReset={
                                replay
                                  ? () => {
                                      setInput(
                                        JSON.stringify(replay?.input ?? {})
                                      );
                                    }
                                  : undefined
                              }
                            />
                          ),
                          visible: true,

                          defaultSize: 80,
                        },
                        {
                          content: (
                            <ExecutionSettings
                              value={overrides}
                              onUpdate={(newData) =>
                                setOverrides({ ...overrides, ...newData })
                              }
                            />
                          ),
                          visible: true,
                          defaultSize: 20,
                          // clamps so that it doesn't show more than the required fields in the execution override form
                          maxSize: 30,
                          minSize: 5,
                          collapsible: true,
                        },
                      ]}
                    />
                  </Box>
                ),
                visible: true,
              },
              {
                minSize: 20,
                content: <YAMLViewer worksheet={worksheet} />,
                visible: true,
              },
            ]}
          />
        </Box>
        <PageFooter
          worksheetId={worksheetId}
          error={error}
          onExecute={handleExecution}
        />
      </Box>
    </WebsiteLayout>
  );
};

const PageHeader = () => {
  const { back } = useRouter();
  return (
    <Box display="flex" alignItems="center" gap={3} padding={1}>
      <IconButton onClick={() => back()}>
        <ArrowBackIcon color="primary" />
      </IconButton>
      <Typography variant="h5">Execute worksheet</Typography>
    </Box>
  );
};

const PageFooter: React.FC<{
  worksheetId: string;
  error?: string;
  onExecute: () => void;
}> = ({ error, worksheetId, onExecute }) => {
  const { push } = useRouter();
  return (
    <Box>
      <Divider />
      <Box p={2} display="flex" alignItems="center" gap={3}>
        <Tooltip
          title={'Correct all errors to continue.'}
          disableHoverListener={!error}
        >
          <span>
            <Button
              disabled={!!error}
              variant="contained"
              startIcon={<SendIcon />}
              size="small"
              onClick={onExecute}
            >
              Execute
            </Button>
          </span>
        </Tooltip>
        <Button
          startIcon={<CancelIcon />}
          color="inherit"
          size="small"
          sx={{ fontWeight: 900 }}
          onClick={() => push(`/worksheets/${worksheetId}`)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

const WorksheetHeader: React.FC<{ worksheet?: WorksheetEntity }> = ({
  worksheet,
}) => (
  <Box padding={3} display="flex" flexDirection="column" gap={1}>
    <Typography variant="h6">{worksheet?.name}</Typography>
    <Typography variant="body2">
      Use JSON (JavaScript Object Notation) as input for your task.{' '}
      <Link href="/docs/json" target="_blank">
        Learn more{'  '}
        <OpenInNewIcon fontSize="small" />
      </Link>
    </Typography>
  </Box>
);

const ExecutionSettings: React.FC<{
  value?: ExecutionOverrideForm;
  onUpdate: (form: ExecutionOverrideForm) => void;
}> = ({ value, onUpdate }) => (
  <Box height="100%" width="100%" overflow="scroll">
    <Box
      height="48px"
      px={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h6">Customize</Typography>
      <Tooltip
        placement="top"
        title={
          <Box>
            Logs are retained for 24 hours or up to 10MB, whichever comes first.
          </Box>
        }
      >
        <HelpIcon fontSize="small" color="primary" />
      </Tooltip>
    </Box>
    <Divider />
    <Box p={3}>
      <WorksheetLogLevelField
        level={value?.logLevel ?? 'silent'}
        onUpdate={(logLevel) => onUpdate({ logLevel })}
        helperText={
          "Overwrite your worksheet's default log level exclusively for this execution."
        }
      />
    </Box>
    <Box px={3} pb={2}>
      <WorksheetTimeoutField
        timeout={value?.timeout ?? 0}
        onUpdate={(timeout) => onUpdate({ timeout })}
      />
    </Box>
  </Box>
);
