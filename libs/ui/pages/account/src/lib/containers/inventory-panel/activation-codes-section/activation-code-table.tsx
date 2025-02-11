import { SvgIconComponent } from '@mui/icons-material';
import { Box, Button, Link, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ActivationCodeType } from '@prisma/client';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { helpRoutes } from '@worksheets/routes';
import {
  PseudoPagination,
  usePseudoPagination,
} from '@worksheets/ui/components/pagination';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { printShortDate } from '@worksheets/util/time';
import { ActivationCodeDetailSchema } from '@worksheets/util/types';
import * as React from 'react';

import { ActivationCodeModal } from './activation-code-modal';

const codeTypeLogo: Record<ActivationCodeType, SvgIconComponent> = {
  [ActivationCodeType.STEAM]: ColoredSteamGames,
};
const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

type ActivationCodesTableProps = {
  codes: ActivationCodeDetailSchema[];
};

export const ActivationCodesTable: React.FC<ActivationCodesTableProps> = ({
  codes,
}) => {
  const { rows, ...pagination } = usePseudoPagination(codes);
  if (codes.length === 0) {
    return <EmptyPrizesPlaceholder />;
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
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Accessed</TableCell>
            <TableCell align="right" width={180}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((code) => (
            <CodeRow key={code.id} code={code} />
          ))}
        </TableBody>
      </Table>
      <PseudoPagination {...pagination} />
    </TableContainer>
  );
};

const CodeRow: React.FC<{
  code: ActivationCodeDetailSchema;
}> = ({ code }) => {
  const [open, setOpen] = React.useState(false);
  const CoeTypeLogo = codeTypeLogo[code.type];

  return (
    <>
      <TableRow
        key={code.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell width={12}>
          <CoeTypeLogo
            sx={{
              height: 24,
              width: 24,
            }}
          />
        </TableCell>

        <TableCell
          align="left"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <Link href={code.sourceUrl} target="_blank">
            <b>{code.name ?? code.name}</b>
          </Link>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          {code.accessedAt ? printShortDate(code.accessedAt) : 'N/A'}
        </TableCell>
        <TableCell align="right" width={180}>
          <Button
            onClick={() => setOpen(true)}
            size="small"
            variant="arcade"
            color={'secondary'}
            sx={{ mb: 0.5, minWidth: 135 }}
          >
            View Code
          </Button>
        </TableCell>
      </TableRow>
      <ActivationCodeModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        code={code}
      />
    </>
  );
};

const EmptyPrizesPlaceholder = () => {
  const isMobile = useMediaQueryDown('sm');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        flexDirection: 'column',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        padding: 3,
        gap: 2,
        textAlign: 'center',
      }}
    >
      <ValentinesGift
        sx={{
          height: isMobile ? 100 : 150,
          width: isMobile ? 100 : 150,
          py: 2,
        }}
      />
      <Typography typography={{ xs: 'h6', sm: 'h5', md: 'h4' }} color="error">
        You don't have any codes yet
      </Typography>
      <Typography variant="body2">
        Participate in a Raffles or Boss Battles to win prizes and earn
      </Typography>
      <Typography variant="body2">
        Keep playing games and referring friends to earn more tokens and win
        prizes!
      </Typography>
      <Link href={helpRoutes.prizes.url()} variant="body1" color="error">
        Learn More
      </Link>
    </Box>
  );
};
