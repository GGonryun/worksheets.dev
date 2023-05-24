import { Box, Typography, Button } from '@mui/material';
import { OfficialApplicationLibrary } from '@worksheets/apps/library';
import { Execution } from '@worksheets/engine';
import { useState } from 'react';
import React from 'react';
import { CodeEditor } from './CodeEditor';

export default function Worksheets() {
  const [worksheet, setWorksheet] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  function handleSubmit() {
    const library = new OfficialApplicationLibrary();
    const execution = new Execution({ library });
    execution
      .run(worksheet, {})
      .then((data) => {
        setResponse(`${JSON.stringify(data, null, 2)}`);
      })
      .catch((error) => {
        setResponse(`(${error.code}) - ${error.message}`);
      });
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
