import { Container, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ResourceExplorer } from '../resource-explorer';
import { Header } from './header';
import { CodeEditor } from '../code-editor';
import { ControlPanel } from '../control-panel';
import { warn } from '@worksheets/ui/common';
import { useUser, request } from '@worksheets/auth/client';
import { useSWRConfig } from 'swr';
import { GetWorksheetResponse, PostWorksheetResponse } from '../../server';
import { useState, useEffect } from 'react';
import ExecutionInformation from '../execution-info/execution-info';
import { GetExecutionsResponse } from '../../api/execution/get';

export function WebEditor() {
  const router = useRouter();
  const { worksheet } = router.query;
  const { user } = useUser();
  const { mutate } = useSWRConfig();
  const privateCommand = request.command.private(user);
  const publicCommand = request.command.public();

  const worksheetId = worksheet as string;
  const apiReplay = (executionsId: string) => `/api/r/${executionsId}`;
  const apiExecute = `/api/x/${worksheetId}`;
  const apiWorksheet = `/api/worksheets/${worksheetId}`;
  const apiWorksheets = '/api/worksheets';

  const { data } = request.query.usePrivate<GetWorksheetResponse>(
    apiWorksheet,
    user
  );

  const { data: executionsData } =
    request.query.usePublic<GetExecutionsResponse>(apiExecute);

  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  const handleNew = () => {
    privateCommand<PostWorksheetResponse>(apiWorksheets, 'POST', { text })
      .then((d) => {
        router.push(`/ide/${d}`);
        setText('');
      })
      .catch(warn(`failed to save worksheet`))
      .finally(() => mutate(apiWorksheets));
  };

  function handleExecute() {
    publicCommand(apiExecute, 'POST', { text })
      .catch(warn(`failed to execute worksheet`))
      .finally(() => mutate(apiExecute));
  }

  function handleSave() {
    privateCommand(apiWorksheet, 'POST', { text })
      .catch(warn(`failed to save worksheet`))
      .finally(() => mutate(apiWorksheet));
  }

  function handleClear() {
    privateCommand(apiExecute, 'DELETE')
      .catch(warn('failed to delete worksheet'))
      .finally(() => mutate(apiExecute));
  }

  function handleDelete(executionId: string) {
    privateCommand(apiExecute, 'DELETE', { executionId })
      .catch(warn('failed to delete worksheet'))
      .finally(() => mutate(apiExecute));
  }

  function handleReplay(executionId: string) {
    publicCommand(apiExecute, 'POST', { replay: executionId })
      .catch(warn('failed to replay worksheet'))
      .finally(() => mutate(apiExecute));
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        marginTop={4}
        gap={2}
        alignItems="center"
      >
        <Header worksheetId={worksheetId} />
        <ControlPanel
          onNew={handleNew}
          onExecute={handleExecute}
          onSave={handleSave}
        />
        <Box display="flex" alignItems="flex-start" gap={3}>
          <ResourceExplorer />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={3}
          >
            <CodeEditor
              value={text}
              onChange={(newValue) => setText(newValue)}
            />
          </Box>
          <ExecutionInformation
            onClear={() => handleClear()}
            onDelete={(executionId) => handleDelete(executionId)}
            onReplay={(executionId) => handleReplay(executionId)}
            worksheets={executionsData}
          />
        </Box>
      </Box>
    </Container>
  );
}
