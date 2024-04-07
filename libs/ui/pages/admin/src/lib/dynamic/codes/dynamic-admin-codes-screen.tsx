import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import { ActivationCodeSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 20;

const AdminCodesScreen = () => {
  const [page, setPage] = useState(0);
  const codes = trpc.admin.codes.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (codes.isLoading) return <LoadingScreen />;
  if (codes.error) return <ErrorScreen message={codes.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.path()}>Directory</ListButton>
      <CustomPaper title="Activation Codes List">
        <ListHeader />

        {codes.data.map((code) => (
          <ListItem key={code.codeId} code={code} />
        ))}

        <ListFooter
          page={page}
          count={codes.data.length}
          pageSize={PAGE_SIZE}
          onPrevious={() => setPage((prev) => prev - 1)}
          onNext={() => setPage((prev) => prev + 1)}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

const ListHeader = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
      color="text.arcade"
      pb={1}
    >
      <Typography variant="h6">Code ID</Typography>
      <Typography variant="h6">Assigned</Typography>
      <Typography variant="h6">Created At</Typography>
    </Box>
  );
};

const ListItem: React.FC<{
  code: ActivationCodeSummary;
}> = ({ code }) => {
  return (
    <Box
      component={Link}
      color="text.arcade"
      href={routes.admin.code.path({
        params: { codeId: code.codeId },
      })}
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr'}
    >
      <Typography>{code.codeId}</Typography>
      <Typography>{code.winner ? 'Assigned' : 'Available'}</Typography>
      <Typography>{printShortDateTime(code.createdAt)}</Typography>
    </Box>
  );
};

export const DynamicAdminCodesScreen = dynamic(
  () => Promise.resolve(AdminCodesScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
