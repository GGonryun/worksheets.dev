import { Box, Link, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ValentinesLetter } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { printShortDate } from '@worksheets/util/time';
import { Referral } from '@worksheets/util/types';
import * as React from 'react';

type ReferralsTableProps = {
  referrals: Referral[];
};

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const ReferralsTable: React.FC<ReferralsTableProps> = ({
  referrals,
}) => {
  if (referrals.length === 0) {
    return <EmptyReferralsPlaceholder />;
  }
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
            <TableCell width="64%">Username</TableCell>
            {/* Created On */}
            <TableCell align="right">Created On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow
              key={referral.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {referral.username ?? referral.id}
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  textWrap: 'nowrap',
                }}
              >
                {printShortDate(referral.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const EmptyReferralsPlaceholder = () => (
  <Box
    sx={{
      width: '100%',
      display: 'grid',
      placeItems: 'center',
      flexDirection: 'column',
      border: (theme) => `1px solid ${theme.palette.divider}`,
      padding: 3,
    }}
  >
    <ValentinesLetter
      sx={{
        height: 150,
        width: 150,
        py: 2,
      }}
    />
    <Typography variant="h4" color="error">
      Invite your friends
    </Typography>
    <Box my={1} mb={2} textAlign="center">
      <Typography variant="body2">
        Earn tokens when someone plays games with your link.
      </Typography>
      <Typography variant="body2">
        When they sign up, you'll both get a bonus!
      </Typography>
    </Box>
    <Link href={routes.help.referrals.path()} variant="body1" color="error">
      Learn More
    </Link>
  </Box>
);
