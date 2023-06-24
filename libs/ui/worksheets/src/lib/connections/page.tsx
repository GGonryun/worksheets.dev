import AddIcon from '@mui/icons-material/AddOutlined';
import { useRouter } from 'next/router';
import { PageLayout } from '../page-layout';
import { ConnectionsDataTable } from './data-table';
import { useEffect, useState } from 'react';
import { ConnectionBuilderSidecar } from './connection-builder-sidecar';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@worksheets/util/auth/client';
import { trpc } from '@worksheets/trpc/ide';

export const ConnectionsPage: React.FC<{ connectionId?: string }> = ({
  connectionId,
}) => {
  const { push } = useRouter();
  const [activeConnection, setActiveConnection] = useState('');
  const { user } = useUser();
  const { data: connections, isLoading } = trpc.connections.dataTable.useQuery(
    undefined,
    {
      enabled: !!user,
    }
  );

  useEffect(() => {
    if (connectionId) {
      console.log('setting active connection', connectionId);
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
    >
      <ConnectionsDataTable
        canModify
        onConnectionClick={(id) => setActiveConnection(id)}
        connections={connections ?? []}
        loading={isLoading}
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
        canModify
      />
    </PageLayout>
  );
};
