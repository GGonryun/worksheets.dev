import { Box, Container, IconButton, Typography } from '@mui/material';
import { ResourceExplorer } from '../resource-explorer';
import { Header } from './header';
import { CodeEditor } from '../code-editor/code-editor';
import ExecutionInformation from '../execution-info/execution-info';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { LoginWithGoogle, useUser } from '@worksheets/util/auth/client';
export function WebEditor() {
  const { user, loading } = useUser();

  if (!user && !loading) {
    return <LoginWithGoogle />;
  }

  return (
    <Container maxWidth="xl">
      <Header />
      <Box display="flex" gap={1} justifyContent="center">
        <Explorer />
        <Box flexGrow={2}>
          <CodeEditor />
        </Box>
        <Box flexGrow={1} maxWidth={600} minHeight={600}>
          <ExecutionInformation />
        </Box>
      </Box>
      <LoginWithGoogle />
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
