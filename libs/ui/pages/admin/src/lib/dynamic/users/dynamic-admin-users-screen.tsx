import { Box, Link, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { UserSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 10;
const AdminUsersScreen = () => {
  const [page, setPage] = useState(0);

  const users = trpc.admin.users.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (users.isLoading) return <div>Loading...</div>;
  if (users.error) return <div>Error: {users.error.message}</div>;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.path()}>Directory</ListButton>
      <CustomPaper title="Users List">
        <ListHeader />

        {users.data?.map((user) => (
          <ListItem key={user.userId} user={user} />
        ))}

        <ListFooter
          pageSize={PAGE_SIZE}
          count={users.data.length}
          page={page}
          onPrevious={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

const ListHeader = () => (
  <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr">
    <Typography fontWeight={700} variant="h6">
      User ID
    </Typography>
    <Typography fontWeight={700} variant="h6">
      Username
    </Typography>
    <Typography fontWeight={700} variant="h6">
      Type
    </Typography>
    <Typography fontWeight={700} variant="h6">
      Created At
    </Typography>
  </Box>
);

const ListItem: React.FC<{
  user: UserSummary;
}> = ({ user }) => (
  <Box
    component={Link}
    color="text.arcade"
    href={routes.admin.user.path({
      params: {
        userId: user.userId,
      },
    })}
    display="grid"
    gridTemplateColumns="1fr 1fr 1fr 1fr"
  >
    <Typography>{user.userId}</Typography>
    <Typography>{user.username}</Typography>
    <Typography>{user.type}</Typography>
    <Typography>{printShortDateTime(user.createdAt)}</Typography>
  </Box>
);

export const DynamicAdminUsersScreen = dynamic(
  () => Promise.resolve(AdminUsersScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
