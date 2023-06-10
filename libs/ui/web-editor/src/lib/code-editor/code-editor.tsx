import { Box } from '@mui/material';
import { request, useUser } from '@worksheets/util/auth/client';
import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { warn } from '@worksheets/ui/common';
import { ControlPanel } from './control-panel';
import {
  GetWorksheetResponse,
  GetWorksheetsResponse,
  PostWorksheetResponse,
} from '@worksheets/api/worksheets';

const DynamicCodeEditor = dynamic(() => import('./ace-editor'), {
  ssr: false,
});

export const CodeEditor: FC = () => {
  const router = useRouter();
  const worksheetId = router.query.worksheet as string;
  const { user } = useUser();
  const mutate = request.query.useMutate();
  const privateCommand = request.command.private(user);
  const publicCommand = request.command.public();

  const apiExecutions = `/api/worksheets/${worksheetId}/executions`;
  const execute = `/api/x/${worksheetId}`;
  const apiWorksheet = `/api/worksheets/${worksheetId}`;
  const apiWorksheets = '/api/worksheets';

  const { data } = request.query.usePrivate<GetWorksheetResponse>(
    apiWorksheet,
    user,
    Boolean(worksheetId)
  );

  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  const handleNew = () => {
    privateCommand<PostWorksheetResponse>(apiWorksheets, 'POST')
      .then((d) => {
        mutate(apiWorksheets).then(() => {
          setText('');
          router.push(`/ide/${d}`);
        });
      })
      .catch(warn(`failed to create new worksheet`));
  };

  function handleExecute() {
    privateCommand(`${apiWorksheets}/${worksheetId}`, 'POST', { text })
      .then(() =>
        publicCommand(execute, 'POST', { worksheetId })
          .then(() => mutate(apiExecutions))
          .catch(warn(`failed to execute worksheet`))
      )
      .catch(warn('failed to save worksheet before execution'));
  }

  function handleSave() {
    privateCommand(`${apiWorksheets}/${worksheetId}`, 'POST', { text }).catch(
      warn(`failed to save worksheet`)
    );
  }

  function handleDeleteWorksheet() {
    privateCommand(apiWorksheet, 'DELETE')
      .then(() => mutate(apiWorksheets))
      .then(() =>
        privateCommand<GetWorksheetsResponse>('/api/worksheets', 'GET')
      )
      .then((ws) => Object.values(ws).at(0))
      .then((worksheet) => router.push(`/ide/${worksheet?.id}`))
      .catch(warn('failed to delete worksheet'));
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height={'100%'}
      maxHeight={800}
    >
      {worksheetId && (
        <DynamicCodeEditor
          width="95%"
          value={text}
          onChange={(newValue) => setText(newValue)}
        />
      )}
      <ControlPanel
        onDelete={handleDeleteWorksheet}
        onNew={handleNew}
        onExecute={handleExecute}
        onSave={handleSave}
      />
    </Box>
  );
};
