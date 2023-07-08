import { FormLayout } from './form-layout';
import { ConnectionsDataTable } from '../connections/data-table';
import { Box, Typography, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import { ConnectionBuilderSidecar } from '../connections/connection-builder-sidecar';
import { v4 as uuidv4 } from 'uuid';
import { useConnectionSidecarController } from '../connections/useConnectionSidecarController';
import { useWorksheetConnections } from './useWorksheetConnections';

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
  const {
    connections,
    selections,
    errors,
    getConnectionErrorMessage,
    setSelections,
  } = useWorksheetConnections();

  const { activeConnection, closeEditor, createConnection, editConnection } =
    useConnectionSidecarController();

  const hasErrors = Object.keys(errors).length > 0;

  const openSidecar = (id: string | undefined) => {
    // requests without id are new connections
    if (id) {
      editConnection(id);
    } else {
      createConnection();
    }
  };

  const handleSaved = (id: string) => {
    if (!selections.includes(id)) {
      setSelections((previous) => [...previous, id]);
    }
  };

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
          disabled: hasErrors,
          tooltip: errors[''],
          onClick: () =>
            onSubmit({
              connections: selections,
            }),
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
          onClick={() => openSidecar(uuidv4())}
        >
          Create
        </Button>
      </Box>

      <Divider />
      <Box height="calc(100% - 50px)">
        <ConnectionsDataTable
          validateRow={(row) => getConnectionErrorMessage(row) === ''}
          onConnectionClick={openSidecar}
          onSelectionChange={setSelections}
          selections={selections}
          connections={connections.data ?? []}
          loading={connections.isLoading}
        />
      </Box>
      {activeConnection && (
        <ConnectionBuilderSidecar
          onSaved={handleSaved}
          id={activeConnection}
          open={Boolean(activeConnection)}
          onClose={closeEditor}
        />
      )}
    </FormLayout>
  );
};
