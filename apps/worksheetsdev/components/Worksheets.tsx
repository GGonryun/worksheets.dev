import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { CodeEditor } from './CodeEditor';
import { authorized, poster, useUser, yamled } from '@worksheets/auth/client';

export default function Worksheets() {
  const { user } = useUser();

  const [worksheet, setWorksheet] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const secureFetch = authorized(yamled(poster), user);

  function handleSubmit() {
    console.log('Fetching securely');
    secureFetch('/api/x', { body: worksheet })
      .then((r) => r.json())
      .then((data) => setResponse(JSON.stringify(data)));
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={3}
    >
      <CodeEditor
        value={worksheet}
        onChange={(newValue) => setWorksheet(newValue)}
      />
      <Button variant="contained" onClick={() => handleSubmit()}>
        EXECUTE WORKSHEET
      </Button>
      {response && (
        <Box>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Box>
  );
}
