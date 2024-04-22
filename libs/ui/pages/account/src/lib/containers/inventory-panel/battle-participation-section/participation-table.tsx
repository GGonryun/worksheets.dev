import { Box, Link, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BattleStatus } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { UserBattleParticipationSchema } from '@worksheets/util/types';
import * as React from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const ParticipationTable: React.FC<{
  participation: UserBattleParticipationSchema[];
}> = ({ participation }) => {
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
          {participation.map((p) => (
            <TableRow
              key={p.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
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
                  color={isDefeated(p) ? 'error.main' : 'success.main'}
                >
                  {isDefeated(p) ? 'Defeated' : 'Active'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const isDefeated = (p: UserBattleParticipationSchema) =>
  p.battle.status === BattleStatus.COMPLETE ||
  p.battle.damage >= p.battle.mob.maxHp;
