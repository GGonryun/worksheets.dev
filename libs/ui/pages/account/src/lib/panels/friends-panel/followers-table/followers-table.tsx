import { Box, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Follower } from '@worksheets/util/types';
import * as React from 'react';

import { FollowersTableBody } from './followers-table-body';
import { FollowersTableHead } from './followers-table-head';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const FollowersTable: React.FC<{
  followers: Follower[];
  onAdd: (code: string) => void;
}> = ({ followers, onAdd }) => {
  return (
    <TableContainer component={StyledBox}>
      <Table
        size="small"
        sx={{
          minWidth: 400,
        }}
      >
        <FollowersTableHead />
        <FollowersTableBody followers={followers} onAdd={onAdd} />
      </Table>
    </TableContainer>
  );
};

export type FollowersTableProps = React.ComponentProps<typeof FollowersTable>;
