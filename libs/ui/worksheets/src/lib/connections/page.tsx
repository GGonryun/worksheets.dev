import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import { useRouter } from 'next/router';
import { FilterTextInput } from '../shared/filter-text-input';
import { PageLayout } from '../page-layout';
import { ConnectionsDataTable } from './data-table';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { ConnectionBuilderSidecar } from './connection-builder-sidecar';
import { v4 as uuidv4 } from 'uuid';
import { trpc } from '@worksheets/trpc/ide';

export const ConnectionsPage: React.FC<{ connectionId?: string }> = ({
  connectionId,
}) => {
  const { push } = useRouter();
  const [selections, setSelections] = useState<GridRowId[]>([]);
  const [activeConnection, setActiveConnection] = useState('');

  const utils = trpc.useContext();
  const { data: connections } = trpc.connections.dataTable.useQuery();
  const deleteConnection = trpc.connections.delete.useMutation();

  useEffect(() => {
    if (connectionId) {
      setActiveConnection(connectionId);
    }
  }, [connectionId]);

  return (
    <PageLayout
      title={'Connections'}
      primary={{
        children: 'Create',
        startIcon: <AddIcon />,
        size: 'small',
        onClick() {
          setActiveConnection(uuidv4());
        },
      }}
      secondary={{
        sx: { display: selections.length ? 'span' : 'none' },
        children: 'Delete',
        startIcon: <RemoveIcon />,
        size: 'small',
        color: 'error',
        onClick() {
          alert('TODO: delete all selected connections');
        },
      }}
    >
      <FilterTextInput placeholder="Filter by name" />
      <Divider />
      length:{connections?.length ?? 0}
      <ConnectionsDataTable
        rows={connections ?? []}
        selections={selections}
        onConnectionClick={(id) => setActiveConnection(id)}
        onSelectionChange={setSelections}
        onConnectionDelete={async (id) => {
          // eslint-disable-next-line no-restricted-globals
          if (confirm('Are you sure you want to delete this connection?')) {
            await deleteConnection.mutateAsync(id);
            utils.connections.dataTable.invalidate();
          }
        }}
      />
      <ConnectionBuilderSidecar
        open={Boolean(activeConnection)}
        onClose={() => {
          if (connectionId) {
            push(`/connections`);
          } else {
            setActiveConnection('');
          }
        }}
        id={activeConnection}
      />
    </PageLayout>
  );
};
