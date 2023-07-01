import { Box, Button, Divider, Tooltip } from '@mui/material';
import { ConnectionsDataTable } from '../connections/data-table';
import { ConnectionBuilderSidecar } from '../connections/connection-builder-sidecar';
import { OpenInNew } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/router';
import { useConnectionSidecarController } from '../connections/useConnectionSidecarController';
import { useWorksheetConnections } from '../create-a-worksheet/useWorksheetConnections';

type ConnectionsSelectorProps = {
  //
};

export const ConnectionsSelector: React.FC<ConnectionsSelectorProps> = () => {
  const { query } = useRouter();
  const worksheetId = query.id as string;

  const { activeConnection, closeEditor, createConnection, editConnection } =
    useConnectionSidecarController();

  const {
    connections,
    selections,
    updating,
    errors,
    getConnectionErrorMessage,
    setSelections,
    stageSelections,
    revertSelections,
    commitSelections,
  } = useWorksheetConnections(worksheetId);
  const { push } = useRouter();
  const hasErrors = Object.keys(errors).length > 0;

  const openSidecar = (id: string | undefined) => {
    // requests without id are new connections
    if (id) {
      editConnection(id);
    } else {
      createConnection();
    }
  };

  return (
    <Box>
      <Box
        p={1}
        pl={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box width="100px">
            {updating ? (
              <Tooltip title={errors['']} placement="bottom-start">
                <span>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={hasErrors}
                    onClick={() => {
                      commitSelections();
                    }}
                  >
                    Save
                  </Button>
                </span>
              </Tooltip>
            ) : (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => createConnection()}
              >
                Create
              </Button>
            )}
          </Box>
          <Box width="100px">
            {updating ? (
              <Button
                variant="text"
                color="inherit"
                size="small"
                sx={{ fontWeight: 900 }}
                onClick={() => {
                  revertSelections();
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => stageSelections()}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
        <Button
          size="small"
          endIcon={<OpenInNew />}
          onClick={() => push('/templates?apps=true')}
        >
          Browse Apps
        </Button>
      </Box>
      <Divider />
      <ConnectionsDataTable
        readonly={!updating}
        validateRow={(row) => getConnectionErrorMessage(row) === ''}
        onConnectionClick={openSidecar}
        onSelectionChange={setSelections}
        selections={selections}
        connections={connections.data ?? []}
        loading={connections.isLoading}
      />
      {activeConnection && (
        <ConnectionBuilderSidecar
          id={activeConnection}
          open={Boolean(activeConnection)}
          onClose={closeEditor}
        />
      )}
    </Box>
  );
};
