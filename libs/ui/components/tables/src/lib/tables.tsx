import {
  Box,
  styled,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';

export { TableCell, TableRow } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  '& thead': {
    backgroundColor: theme.palette.grey[100],
  },
  '& td, & th': {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.body3.fontSize,
    },
  },
  border: `2px solid ${theme.palette.divider}`,
}));

export const Table: React.FC<{
  title?: React.ReactNode;
  head: React.ReactNode;
  body: React.ReactNode;
}> = ({ head, body, title }) => (
  <Column gap={1}>
    {title}

    <TableContainer component={StyledBox}>
      <MuiTable
        size="small"
        sx={{
          minWidth: 400,
        }}
      >
        <TableHead>
          <TableRow>{head}</TableRow>
        </TableHead>
        <TableBody>{body}</TableBody>
      </MuiTable>
    </TableContainer>
  </Column>
);
