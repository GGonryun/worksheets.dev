import { Box, Typography } from '@mui/material';

import { DataPair } from './data-pair';

export function DataGroup<T>({
  label,
  items,
  builder,
}: {
  label: string;
  items: T[];
  builder: (item: T) => React.ComponentProps<typeof DataPair> & {
    key: string | number;
  };
}) {
  return (
    <Box display="flex" flexDirection="column">
      <br />
      <Typography variant="h5" gutterBottom>
        {label}
      </Typography>
      {items.map((item) => (
        <DataPair {...builder(item)} />
      ))}
    </Box>
  );
}
