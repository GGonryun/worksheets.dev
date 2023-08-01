import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { newRegistry, ApplicationFailure } from '@worksheets/sdk';

const apps = newRegistry({
  credentials: {},
});

const openai = apps.openai({
  apiKey: '',
});

export function Index() {
  const [prompt, setPrompt] = useState('Say this is a test');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const submitOperation = async () => {
    if (!prompt) {
      alert('missing values');
      return;
    }

    try {
      setLoading(true);

      const result = await openai.createChatCompletion({
        model: 'text-davinci-003',
        prompt: 'Say this is a test',
        max_tokens: 50,
        temperature: 0.1,
      });

      setResult(result.choices[0].message?.content ?? 'N/A');
    } catch (error) {
      if (error instanceof ApplicationFailure) {
        alert(`known: ${error.code}`);
        alert(`known: ${error.reason}`);
        alert(`known: ${error.message}`);
      } else {
        alert(`unknown: ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      Ask davinci a question.
      <Box>Enter prompt:</Box>
      <TextField
        value={prompt}
        onChange={(event) => {
          setPrompt(event.target.value);
        }}
      />
      <Button onClick={submitOperation}>Ask Question</Button>
      {loading ? <CircularProgress /> : <Box>Response: {result}</Box>}
    </Box>
  );
}

export default Index;
