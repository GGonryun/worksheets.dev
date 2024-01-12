import { Attachment } from '@mui/icons-material';
import { Link, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatMoney } from '@worksheets/util/numbers';
import { printShortDate } from '@worksheets/util/time';
import { FC } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    textDecoration: 'underline',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export type ReceiptTableProps = {
  rows: {
    date: Date;
    organization: { name: string; url: string };
    receipt: string;
    quantity: number;
  }[];
};

export const ReceiptTable: FC<ReceiptTableProps> = ({ rows }) => {
  // latest first
  rows.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell>Organization</StyledTableCell>
            <StyledTableCell align="right">Receipt Link</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="left">
                {printShortDate(row.date)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Link target="_blank" href={row.organization.url}>
                  {row.organization.name}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link
                  target="_blank"
                  href={row.receipt}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  Link
                  <Attachment fontSize="small" />
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatMoney(row.quantity)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
