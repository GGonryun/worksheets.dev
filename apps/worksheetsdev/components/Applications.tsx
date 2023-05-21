import { Box, Button, Collapse, IconButton, Typography } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import useSWR from 'swr';
import { MethodWithSchema } from '../pages/api/apps';
import JSONPretty from 'react-json-pretty';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useState } from 'react';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Applications() {
  const { data } = useSWR<MethodWithSchema[]>('/api/apps', fetcher);
  if (!data) {
    return <Box>No Apps</Box>;
  }

  return (
    <Box>
      <Typography variant="h4">Application Registry</Typography>
      {data.map((d, i) => (
        <MethodInfo definition={d} key={i} />
      ))}
    </Box>
  );
}

type MethodInfoProps = { definition: MethodWithSchema };
function MethodInfo({ definition }: MethodInfoProps) {
  const [showInputs, setShowInputs] = useState(false);
  const [showOutputs, setShowOutputs] = useState(false);
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={3}>
        <Box width="200px">
          <Typography variant="h6">{definition.path}</Typography>
        </Box>
        <Button
          size="small"
          variant="contained"
          startIcon={<KeyboardArrowDownRoundedIcon />}
          onClick={() => {
            setShowInputs(!showInputs);
            setShowOutputs(false);
          }}
        >
          inputs
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<KeyboardArrowDownRoundedIcon />}
          onClick={() => {
            setShowInputs(false);
            setShowOutputs(!showOutputs);
          }}
        >
          outputs
        </Button>
      </Box>

      <Collapse in={showInputs}>
        <JSONPretty id="json-pretty" data={definition.input}></JSONPretty>
      </Collapse>
      <Collapse in={showOutputs}>
        <JSONPretty id="json-pretty" data={definition.output}></JSONPretty>
      </Collapse>
    </Box>
  );
}
