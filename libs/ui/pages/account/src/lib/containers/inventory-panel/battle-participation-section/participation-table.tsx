import { Box, Link, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { routes } from '@worksheets/routes';
import {
  PseudoPagination,
  usePseudoPagination,
} from '@worksheets/ui/components/pagination';
import {
  isBattleComplete,
  UserBattleParticipationSchema,
} from '@worksheets/util/types';
import * as React from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const ParticipationTable: React.FC<{
  participation: UserBattleParticipationSchema[];
}> = ({ participation }) => {
  const { rows, ...pagination } = usePseudoPagination(participation);
  return (
    <TableContainer component={StyledBox}>
      <Table
        size="small"
        sx={{
          minWidth: 400,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Battle ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Damage</TableCell>
            <TableCell>Strikes</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id}>
              <TableCell component="th" scope="row">
                <Link
                  href={routes.battle.path({
                    params: { battleId: p.battle.id },
                  })}
                >
                  {p.battle.id}
                </Link>
              </TableCell>
              <TableCell>{p.battle.mob.name}</TableCell>
              <TableCell>{p.damage}</TableCell>
              <TableCell>{p.strikes}</TableCell>
              <TableCell>
                <Typography
                  fontWeight={700}
                  color={
                    isBattleComplete(p.battle) ? 'error.main' : 'success.main'
                  }
                >
                  {isBattleComplete(p.battle) ? 'Defeated' : 'Active'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PseudoPagination {...pagination} />
    </TableContainer>
  );
};
