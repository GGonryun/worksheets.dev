import { TablePagination, TablePaginationProps } from '@mui/material';

export const PseudoPagination: React.FC<
  Pick<TablePaginationProps, 'page' | 'onPageChange' | 'count' | 'rowsPerPage'>
> = (props) => {
  return (
    <TablePagination
      sx={{
        [`& .MuiTablePagination-toolbar`]: {
          minHeight: 32,
        },
        [`& .MuiTablePagination-displayedRows`]: {
          margin: 0,
        },
      }}
      size="small"
      component="div"
      rowsPerPageOptions={[]}
      {...props}
    />
  );
};
