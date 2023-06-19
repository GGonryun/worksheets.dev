import { Box, Container, IconButton, Typography } from '@mui/material';
import { ResourceExplorer } from '../resource-explorer';
import { Header } from './header';
import { useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { request, useUser } from '@worksheets/util/auth/client';
import {
  GetWorksheetResponse,
  GetWorksheetsResponse,
  PostWorksheetResponse,
} from '@worksheets/api/worksheets';
import { warn } from '@worksheets/ui/common';
import { useRouter } from 'next/router';

export function WebEditor() {
  const { user } = useUser();
  const router = useRouter();
  const worksheetId = router.query.worksheet as string;
  const mutate = request.query.useMutate();
  const privateCommand = request.command.private(user);

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
    alert('TODO: schedule a new task');
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
    <Container maxWidth="xl">
      <Header />
      <Box display="flex" gap={1} justifyContent="center">
        <Explorer />
        <Box flexGrow={2} maxHeight={800} minHeight={600}>
          DEPRECATED
        </Box>
      </Box>
    </Container>
  );
}

export function Explorer() {
  const [showResources, setShowResources] = useState(false);

  return (
    <Box
      flexGrow={showResources ? 1 : 0}
      maxWidth={370}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {showResources && <Typography>Explorer</Typography>}
        <IconButton
          sx={{ alignSelf: 'flex-end' }}
          size="small"
          onClick={() => setShowResources(!showResources)}
        >
          {showResources ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Box display={showResources ? 'block' : 'none'}>
        <ResourceExplorer />
      </Box>
    </Box>
  );
}
