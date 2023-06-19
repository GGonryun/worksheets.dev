import Box from '@mui/material/Box';
import { ExecutionDetailsDataTable } from './data-table';
import { v4 as uuidv4 } from 'uuid';
export function ExecutionDetails() {
  return (
    <Box sx={{ width: '100%' }}>
      <ExecutionDetailsDataTable
        rows={[
          {
            status: 'ok',
            id: uuidv4(),
            worksheetId: uuidv4(),
            state: 'done',
            duration: '0.321s',
            createdAt: 'Jun 14, 2023, 8:03:46 PM',
          },
          {
            status: 'pending',
            worksheetId: uuidv4(),
            id: uuidv4(),
            state: 'queued',
            duration: '1.234s',
            createdAt: 'Jun 15, 2023, 8:03:46 PM',
          },
          {
            status: 'error',
            worksheetId: uuidv4(),
            id: uuidv4(),
            state: 'failed',
            duration: '2.560s',
            createdAt: 'Jun 16, 2023, 8:03:46 PM',
          },
        ]}
      />
    </Box>
  );
}
