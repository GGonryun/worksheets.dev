import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from '@mui/material';
import { GetServiceDetailsResponse } from '@worksheets/schemas-services';
import { TinyLogo } from '../shared/tiny-logo';

export const EndpointsTable: React.FC<GetServiceDetailsResponse> = ({
  endpoints,
}) => (
  <TableContainer component={Paper} elevation={4}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="left"></TableCell>
          <TableCell align="left">Service</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {endpoints.map((endpoint) => (
          <TableRow
            key={endpoint.title}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell width={30} align="left" sx={{ pr: 0, mx: 0 }}>
              <TinyLogo
                borderless
                area={40}
                label={endpoint.title}
                src={endpoint.logo}
              />
            </TableCell>
            <TableCell align="left">
              <Box>
                <Typography variant="body2" fontWeight={900}>
                  {endpoint.title}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {endpoint.subtitle}
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
