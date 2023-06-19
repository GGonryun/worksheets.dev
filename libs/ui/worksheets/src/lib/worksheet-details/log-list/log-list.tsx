import { Box } from '@mui/material';

export type LogListProps = {
  logs: string[];
};

export const LogList: React.FC<LogListProps> = ({ logs }) => (
  <Box>
    <h1>Logs</h1>
  </Box>
);
