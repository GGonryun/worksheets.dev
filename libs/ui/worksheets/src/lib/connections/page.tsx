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

export const ConnectionsPage: React.FC<{ connectionId?: string }> = ({
  connectionId,
}) => {
  const { push } = useRouter();
  const [selections, setSelections] = useState<GridRowId[]>([]);
  const [connectionSidecarVisible, setConnectionSidecarVisible] =
    useState(false);

  useEffect(() => {
    if (connectionId) {
      // TODO: get connection data and open sidecar with it
      setConnectionSidecarVisible(true);
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
          setConnectionSidecarVisible(true);
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
      <ConnectionsDataTable
        rows={rows}
        selections={selections}
        onConnectionClick={(id) => push(`/connections/${id}`)}
        onSelectionChange={setSelections}
        onConnectionDelete={(id) => {
          alert('TODO: delete connection');
        }}
      />
      <ConnectionBuilderSidecar
        open={connectionSidecarVisible}
        onClose={() => {
          if (connectionId) {
            push(`/connections`);
          } else {
            setConnectionSidecarVisible(false);
          }
        }}
      />
    </PageLayout>
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
