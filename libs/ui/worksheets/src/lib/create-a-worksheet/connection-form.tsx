import { GridRowId } from '@mui/x-data-grid';
import { useState } from 'react';
import { FormLayout } from './form-layout';
import { ConnectionsDataTable } from '../connections/data-table';
import { Box, Typography, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import { useRouter } from 'next/router';
import { FilterTextInput } from '../shared/filter-text-input';

export type ConnectionsFormValues = {
  connections: string[];
};

export type ConnectionsFormProps = {
  onPrevious: () => void;
  onSubmit: (values: ConnectionsFormValues) => void;
  onCancel: () => void;
};

export const ConnectionsForm: React.FC<ConnectionsFormProps> = ({
  onSubmit,
  onCancel,
  onPrevious,
}) => {
  const [selections, setSelections] = useState<GridRowId[]>([]);
  const { push } = useRouter();

  return (
    <FormLayout
      actions={{
        primary: {
          label: 'Back',
          variant: 'outlined',
          color: 'primary',
          sx: { fontWeight: 900 },
          onClick: () => onPrevious(),
        },
        secondary: {
          label: 'Publish',
          sx: { fontWeight: 900 },

          onClick: () =>
            onSubmit({ connections: selections.map((s) => s.toString()) }),
        },
        tertiary: {
          label: 'Cancel',
          onClick: onCancel,
          color: 'inherit',
          variant: 'text',
          sx: { fontWeight: 900 },
        },
      }}
    >
      <Box paddingTop={1.25} paddingBottom={1} px={3} display="flex" gap={6}>
        <Typography variant="h6">Connections</Typography>
        <Button
          startIcon={<AddIcon />}
          size="small"
          onClick={() => push('/worksheets/create?connections=')}
        >
          Create
        </Button>
      </Box>
      <Divider />
      <FilterTextInput placeholder="Filter by name" />
      <Divider />
      <ConnectionsDataTable
        onConnectionClick={(id) => push(`/worksheets/create?connections=${id}`)}
        rows={rows}
        selections={selections}
        onSelectionChange={setSelections}
      />
    </FormLayout>
  );
};

const rows = [
  {
    id: '1',
    name: 'Test Connection',
    app: 'Google Sheets',
    status: 'Active',
    lastUpdated: '2023-05-23 03:05 AM',
    expires: '2023-10-01, 02:25 PM',
  },
];
