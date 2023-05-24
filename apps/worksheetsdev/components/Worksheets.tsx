import { Box, Typography, TextField, Button } from '@mui/material';
import { OfficialApplicationLibrary } from '@worksheets/apps/library';
import { Execution } from '@worksheets/engine';
import { useState } from 'react';

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
    <Box width="100%">
      <TextField
        InputProps={{ style: { fontFamily: 'monospace' } }}
        fullWidth
        multiline
        minRows={12}
        value={worksheet}
        onChange={(e) => setWorksheet(e.currentTarget.value)}
      />
      <Button onClick={() => handleSubmit()}>Run Worksheet</Button>
      {response && <Typography>{response}</Typography>}
    </Box>
  );
}
