import { ArrowLeft } from '@mui/icons-material';
import { Button, Container, Paper, Typography } from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { ItemDetails } from '@worksheets/ui/components/items';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { Table, TableCell, TableRow } from '@worksheets/ui/components/tables';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { ItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import React from 'react';

const Screen: React.FC<{ item: ItemSchema }> = (props) => {
  const sources = trpc.public.items.sources.useQuery(props.item.id);

  if (sources.isLoading) return <LoadingScreen />;
  if (sources.error) return <ErrorScreen />;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Button
        variant="arcade"
        color="error"
        size="small"
        href={playRoutes.items.path()}
        startIcon={<ArrowLeft />}
        sx={{ mb: 3 }}
      >
        All Items
      </Button>
      <Paper
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.palette.background.paper,
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <ItemDetails item={props.item} sources={sources.data} />
      </Paper>
      <br />
      <Description
        open={true}
        title={'Owners'}
        description={<OwnersTable item={props.item} />}
        color="secondary"
      />
    </Container>
  );
};

export const OwnersTable: React.FC<{ item: ItemSchema }> = (props) => {
  const owners = trpc.public.items.owners.useQuery(props.item.id);
  if (owners.isLoading) return <LoadingBar />;
  if (owners.error) return <ErrorComponent />;

  if (!owners.data.length) {
    return <Typography variant="h6">No owners found for this item.</Typography>;
  }

  return (
    <Table
      head={
        <>
          <TableCell>Username</TableCell>
          <TableCell>Found At</TableCell>
        </>
      }
      body={owners.data.map((o) => (
        <TableRow
          key={o.user.username}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>{o.user.username}</TableCell>
          <TableCell>{o.createdAt}</TableCell>
        </TableRow>
      ))}
    />
  );
};

export const DynamicItemScreen = dynamic(() => Promise.resolve(Screen), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
