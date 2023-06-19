import { Box } from '@mui/material';

type ConnectionsSelectorProps = {
  connections: string[];
};

export const ConnectionsSelector: React.FC<ConnectionsSelectorProps> = ({
  connections,
}) => <Box>Hello Connections!</Box>;
