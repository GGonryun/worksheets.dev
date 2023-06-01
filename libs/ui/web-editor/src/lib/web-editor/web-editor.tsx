import { Container, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ResourceExplorer } from '../resource-explorer';
import { Header } from './header';
import { CodeEditor } from '../code-editor';
import { ControlPanel } from '../control-panel';
import { warn } from '@worksheets/ui/common';
import { useUser, request } from '@worksheets/auth/client';
import { GetWorksheetResponse, PostWorksheetResponse } from '../../server';
import { useState, useEffect } from 'react';
import ExecutionInformation from '../execution-info/execution-info';
import { GetExecutionsResponse } from '../../api/executions/get';

import { v4 as uuidv4 } from 'uuid';
export function WebEditor() {
  const router = useRouter();
  const { worksheet } = router.query;
  const { user } = useUser();
  const mutate = request.query.useMutate();
  const privateCommand = request.command.private(user);
  const publicCommand = request.command.public();

  const worksheetId = worksheet as string;
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
    privateCommand<PostWorksheetResponse>(apiWorksheets, 'POST')
      .then((d) => {
        router.push(`/ide/${d}`);
        setText('');
        mutate(apiWorksheets);
      })
      .catch(warn(`failed to create new worksheet`));
  };

  function handleExecute() {
    publicCommand(apiExecute, 'POST', { text })
      .then(() => mutate(apiExecute))
      .catch(warn(`failed to execute worksheet`));
  }

  function handleSave() {
    privateCommand(apiWorksheet, 'POST', { text })
      .then(() => mutate(apiWorksheets))
      .catch(warn(`failed to save worksheet`));
  }

  function handleClearExecutions() {
    privateCommand(apiExecute, 'DELETE')
      .then(() => mutate(apiExecute))
      .catch(warn('failed to clear executions'));
  }

  function handleDeleteExecution(executionId: string) {
    privateCommand(apiExecute, 'DELETE', { executionId })
      .then(() => mutate(apiExecute))
      .catch(warn('failed to delete execution'));
  }

  function handleDeleteWorksheet() {
    privateCommand(apiWorksheet, 'DELETE')
      .then(() => {
        mutate(apiWorksheets);
        router.push(`/ide/${uuidv4()}`);
        setText('');
      })
      .catch(warn('failed to delete worksheet'));
  }

  function handleReplay(executionId: string) {
    publicCommand(apiExecute, 'POST', { replay: executionId, text })
      .then(() => mutate(apiExecute))
      .catch(warn('failed to replay worksheet'));
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
          onDelete={handleDeleteWorksheet}
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
            onClear={() => handleClearExecutions()}
            onDelete={(executionId) => handleDeleteExecution(executionId)}
            onReplay={(executionId) => handleReplay(executionId)}
            executions={executionsData}
          />
        </Box>
      </Box>
    </Container>
  );
}
