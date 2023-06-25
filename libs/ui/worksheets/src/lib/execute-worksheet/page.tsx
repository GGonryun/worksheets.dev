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
import { HorizontalResizableLayout } from '../shared/resizable-layout/horizontal-resizer';
import { VerticalResizableLayout } from '../shared/resizable-layout/vertical-resizer.tsx';
import { useUser } from '@worksheets/util/auth/client';
import { CodeEditor } from '@worksheets/ui/code-editor';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { WorksheetEntity } from '@worksheets/data-access/worksheets';
import React, { useEffect, useState } from 'react';
import FormatPaintIcon from '@mui/icons-material/FormatPaintOutlined';
import HelpIcon from '@mui/icons-material/Help';
import ReportIcon from '@mui/icons-material/Report';
import { WorksheetLogLevelField } from '../create-a-worksheet/configure/fields/worksheet-log-level';
import { LogLevel } from '@worksheets/data-access/tasks';
import { warn } from '@worksheets/ui/common';

export const EXECUTION_HEADER_COMMENT = `
# 👋 These comments are auto-generated and are
#    not a part of your worksheet.
# 📝 Use the left window to provide JSON input 
#    and adjust your execution settings.
`.trimStart();
export const ExecuteWorksheetPage: React.FC = () => {
  const { user } = useUser();
  const { query, push } = useRouter();
  const worksheetId = query.id as string;

  const { data: worksheet } = trpc.worksheets.get.useQuery({ id: worksheetId });
  const [input, setInput] = useState('{}');
  const [error, setError] = useState<string | undefined>(undefined);
  const [logLevel, setLogLevel] = useState<LogLevel | undefined>(undefined);

  const execute = trpc.tasks.execute.useMutation();

  useEffect(() => {
    try {
      JSON.parse(input);
      setError(undefined);
    } catch {
      setError('Failed to parse JSON text');
    }
  }, [input]);

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
      console.log('we have an error!');
      return;
    }

    try {
      const id = await execute.mutateAsync({
        worksheetId,
        input: JSON.parse(input),
        logLevel,
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
          <HorizontalResizableLayout
            atomicId={user?.uid}
            left={{
              content: (
                <Box height="100%" width={'100%'}>
                  <VerticalResizableLayout
                    atomicId={user?.uid}
                    top={{
                      content: (
                        <JSONEditor
                          value={input}
                          onChange={setInput}
                          error={error}
                          onFormat={tryFormatJson}
                        />
                      ),
                      visible: true,

                      defaultSize: 80,
                    }}
                    bot={{
                      content: (
                        <ExecutionSettings
                          value={logLevel ?? worksheet?.logging}
                          onUpdate={setLogLevel}
                        />
                      ),
                      visible: true,
                      defaultSize: 20,
                    }}
                  />
                </Box>
              ),
              visible: true,
            }}
            right={{
              minSize: 20,
              content: <ReadOnlyCodeEditor worksheet={worksheet} />,
              visible: true,
            }}
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
}> = ({ error, worksheetId, onExecute }) => (
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
        href={`/worksheets/${worksheetId}`}
        target="_blank"
      >
        Cancel
      </Button>
    </Box>
  </Box>
);

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

const ReadOnlyCodeEditor: React.FC<{
  worksheet?: WorksheetEntity;
}> = ({ worksheet }) => (
  <Box height="100%" width="100%">
    <Box
      px={2}
      height="48px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h6">Worksheet</Typography>
      <Tooltip
        placement="top"
        title="Explore thousands of custom built worksheets."
      >
        <span>
          <Button
            endIcon={<OpenInNewIcon />}
            size="small"
            variant="contained"
            href="/templates"
            target="_blank"
          >
            Templates
          </Button>
        </span>
      </Tooltip>
    </Box>
    <Divider />
    <Box pl={1} width="100%" height="100%">
      <CodeEditor
        hideLineNumbers
        height="calc(100% - 48px)"
        width="100%"
        value={`${EXECUTION_HEADER_COMMENT}${worksheet?.text ?? ''}` ?? ''}
        disabled={true}
        mode={'yaml'}
        theme={'light'}
        caption={
          <Box display="flex" alignItems="center">
            <Typography variant="caption">
              Editor is in readonly mode.{' '}
              <Link href={`/worksheets/${worksheet?.id}`} target="_blank">
                Click Here <OpenInNewIcon fontSize="small" />
              </Link>{' '}
              to make changes.
            </Typography>
          </Box>
        }
      />
    </Box>
  </Box>
);

const JSONEditor: React.FC<{
  value: string;
  onChange: (newValue: string) => void;
  onFormat: () => void;
  error?: string;
}> = ({ value, onChange, onFormat, error }) => {
  const calculateHeight = () => `calc(100% - ${!error ? 48 : 78}px)`;

  return (
    <Box width="100%" height="100%">
      <Box>
        <Box
          height="48px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ pl: 2 }}>
            Input
          </Typography>
          <Box display="flex" alignItems="center" gap={2} pr={3}>
            <Tooltip
              placement="top"
              title="Visually enchance a JSON (JavaScript Object Notation) string"
            >
              <span>
                <Button
                  startIcon={<FormatPaintIcon />}
                  size="small"
                  variant="text"
                  onClick={onFormat}
                >
                  Format
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Divider />

      <CodeEditor
        height={calculateHeight()}
        width="100%"
        value={value ?? ''}
        onChange={(value) => onChange(value)}
        mode={'json'}
        theme={'light'}
      />
      {error && (
        <Box display="flex" alignItems="center" height={'30px'} gap={0.5}>
          <Box height="100%">
            <ReportIcon color="error" fontSize="small" />
          </Box>
          <Box height="100%">
            <Typography variant="caption" color="red">
              {error}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const ExecutionSettings: React.FC<{
  value?: LogLevel;
  onUpdate: (log: LogLevel) => void;
}> = ({ value = 'warn', onUpdate }) => (
  <Box height="100%" width="100%">
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
        level={value}
        onUpdate={(log) => onUpdate(log)}
        helperText={
          "Overwrite your worksheet's default log level exclusively for this execution."
        }
      />
    </Box>
  </Box>
);
