import Box from '@mui/material/Box';
import { ExecutionDetailsDataTable } from './data-table';
import { Divider } from '@mui/material';
export function ExecutionDetails() {
  return (
    <Box sx={{ width: '100%' }}>
      <ExecutionDetailsDataTable />
      <Divider />
    </Box>
  );
}