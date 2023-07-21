import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { InferInput, InferOutput, newRegistry } from '@worksheets/sdk';

const apps = newRegistry({
  logging: 'verbose',
  credentials: {
    apiKey: 'ws::UIPdakdBd7LGCYuVA3c9' ?? '',
  },
  baseUrl: `${process.env['NEXT_PUBLIC_API_BASE_URL']}/v1`,
});

type Operations = InferInput<'math', 'calc'>['op'];
type MathCalcResult = InferOutput<'math', 'calc'>;

const operations: Record<Operations, string> = {
  '*': 'Multiply',
  '/': 'Divide',
  '+': 'Add',
  '-': 'Subtract',
  '^': 'Exponentiate',
};

export function Index() {
  const [time, setTime] = useState('N/A');
  const [operation, setOperation] = useState<Operations>('+');
  const [result, setResult] = useState<MathCalcResult>(0);
  const [x, setValueX] = useState<number>(0);
  const [y, setValueY] = useState<number>(0);

  const submitOperation = async () => {
    if (!x || !y || !operation) {
      alert('missing values');
      return;
    }

    try {
      const result = await apps.math().calc({
        x,
        y,
        op: operation,
      });
      setResult(result);
    } catch (error) {
      console.error(error);
      alert('failed to calculate');
    }
  };

  return (
    <Box>
      Get the current time.
      <Button
        onClick={async () => {
          try {
            const time = await apps.time().now({});
            setTime(`${time}`);
          } catch (error) {
            console.error(error);
            alert('failed to get time');
          }
        }}
      >
        Get Time
      </Button>
      <Box>Current time: {time}</Box>
      <Box>
        <Typography variant="h4">Calculator</Typography>
        <Box>
          <TextField
            value={x}
            type="number"
            label={'X'}
            onChange={(event) => {
              setValueX(Number(event.target.value));
            }}
          />
          <TextField
            type="number"
            value={y}
            label={'Y'}
            onChange={(event) => {
              setValueY(Number(event.target.value));
            }}
          />
          <TextField
            select
            label="Operation"
            helperText="Please select an operation"
            value={operation ?? '+'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              console.log('changing input', event.target.value);
              setOperation(event.target.value as Operations);
            }}
          >
            {Object.keys(operations).map((option) => (
              <MenuItem key={option} value={option}>
                {option} {operations[option as Operations]}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <Button onClick={submitOperation}>Calculate</Button>
        </Box>
        <Box>Result: {result ?? 'N/A'}</Box>
      </Box>
    </Box>
  );
}

export default Index;
