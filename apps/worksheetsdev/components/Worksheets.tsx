import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function Worksheets() {
  const [worksheet, setWorksheet] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  function handleSubmit() {
    setResponse('');
    fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/text',
      },
      body: JSON.stringify(worksheet),
    })
      .then((r) => {
        if (!r.ok) {
          throw r.status;
        }
        return r.json();
      })
      .then((data) => {
        setResponse(`${JSON.stringify(data, null, 2)}`);
      })
      .catch((code) => {
        setResponse(`request failed with code ${code}`);
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
