import { Box } from '@mui/material';

export type TriggersContainerProps = {
  triggers: string[];
};

export const TriggersContainer: React.FC<TriggersContainerProps> = ({
  triggers,
}) => <Box>Hello Triggers!</Box>;
