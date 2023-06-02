import { Box } from '@mui/material';
import { request, useUser } from '@worksheets/auth/client';
import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { GetWorksheetResponse, PostWorksheetResponse } from '../../server';
import { useRouter } from 'next/router';
import { warn } from '@worksheets/ui/common';
import { ControlPanel } from './control-panel';

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

  const apiExecute = `/api/x/${worksheetId}`;
  const apiWorksheet = `/api/worksheets/${worksheetId}`;
  const apiWorksheets = '/api/worksheets';

  const { data } = request.query.usePrivate<GetWorksheetResponse>(
    apiWorksheet,
    user
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
    publicCommand(apiExecute, 'POST', { text })
      .then(() => mutate(apiExecute))
      .catch(warn(`failed to execute worksheet`));
  }

  function handleSave() {
    privateCommand(`${apiWorksheets}/${worksheetId}`, 'POST', { text })
      .then(() => mutate(apiWorksheets))
      .catch(warn(`failed to save worksheet`));
  }

  function handleDeleteWorksheet() {
    privateCommand(apiWorksheet, 'DELETE')
      .then(() => {
        mutate(apiWorksheets);
        setText('');
      })
      .catch(warn('failed to delete worksheet'));
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height={'100%'}
    >
      <DynamicCodeEditor
        width="95%"
        value={text}
        onChange={(newValue) => setText(newValue)}
      />
      <ControlPanel
        onDelete={handleDeleteWorksheet}
        onNew={handleNew}
        onExecute={handleExecute}
        onSave={handleSave}
      />
    </Box>
  );
};
