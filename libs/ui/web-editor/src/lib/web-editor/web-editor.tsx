import { Container, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { ResourceExplorer } from '../resource-explorer';
import { Header } from './header';
import { CodeEditor } from '../code-editor';
import { ControlPanel } from '../control-panel';
import { v4 as uuidv4 } from 'uuid';
import { useUser, web } from '@worksheets/auth/client';
import useSWR, { useSWRConfig } from 'swr';
import { warn } from '@worksheets/ui/common';
import { GetWorksheetResponse } from '../../server';
import { useState, useEffect } from 'react';
import ExecutionInformation from '../execution-info/execution-info';
const { request, method, headers, body, swr } = web;

export function WebEditor() {
  const { push, query } = useRouter();
  const { worksheet } = query;
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const worksheetId = worksheet as string;

  const { data, isLoading } = useSWR<GetWorksheetResponse>(
    ...swr.secure(`/api/worksheets?id=${worksheetId}`, user)
  );

  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  const handleNew = () => {
    push(`/ide/${uuidv4()}`);
    setText('');
  };

  function handleExecute() {
    mutate('/api/x');
    request(
      method('POST'),
      headers.auth.bearer(user),
      body.json({ id: worksheetId, text, input: undefined })
    )('/api/x')
      .then(warn('failed to execute worksheet'))
      .finally(() => mutate(`/api/x?id=${worksheetId}`));
  }

  function handleSave() {
    request(
      method('POST'),
      headers.auth.bearer(user),
      body.json({ text, id: worksheetId })
    )('/api/worksheets')
      .then(warn('failed to save worksheet'))
      .finally(() => mutate('/api/worksheets'));
  }

  if (isLoading) {
    return <Box>Loading!</Box>;
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
            worksheetId={worksheetId}
            onDelete={function (executionId: string): void {
              alert('TODO');
            }}
            onReplay={function (executionId: string): void {
              alert('TODO');
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
