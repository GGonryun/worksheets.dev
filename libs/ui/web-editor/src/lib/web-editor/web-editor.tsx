import { Box, Container, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ResourceExplorer } from '../resource-explorer';
import { Header } from './header';
import { CodeEditor } from '../code-editor/code-editor';
import ExecutionInformation from '../execution-info/execution-info';
import { useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { request, useUser } from '@worksheets/auth/client';
import { GetWorksheetsResponse } from '../../server';
export function WebEditor() {
  const { query, push } = useRouter();
  const { worksheet } = query;
  const { user, loading: isLoadingUser } = useUser();
  const { data, isLoading: isLoadingData } =
    request.query.usePrivate<GetWorksheetsResponse>(`/api/worksheets`, user);

  const worksheetId = worksheet as string;

  const hasUser = user && !isLoadingUser;
  const hasNoUser = !user && !isLoadingUser;
  const hasData = data && !isLoadingData;

  useEffect(() => {
    if (hasData && hasUser && worksheetId) {
      // if data does not exist redirect to front-page.
      if (!data[worksheetId]) {
        push('/');
      }
    }
  }, [push, data, worksheetId, hasData, hasUser]);

  useEffect(() => {
    if (hasUser && hasData && !worksheetId) {
      push('/');
    }
  }, [push, data, worksheetId, hasData, hasUser]);

  useEffect(() => {
    if (hasNoUser && worksheetId) {
      push('/');
    }
  }, [push, hasNoUser, worksheetId]);

  if (isLoadingUser || isLoadingData) {
    return <Box>Loading...</Box>;
  }
  return (
    <Container maxWidth="xl">
      <Header worksheetId={worksheetId} />
      <Box display="flex" gap={1} justifyContent="center">
        <Explorer />
        <Box flexGrow={2}>
          <CodeEditor />
        </Box>
        <Box flexGrow={1} maxWidth={600} minHeight={600}>
          <ExecutionInformation />
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
