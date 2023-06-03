import { Box, Typography, Button } from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { useRouter } from 'next/router';

export function Header() {
  const { query } = useRouter();
  const { worksheet } = query;
  const worksheetId = worksheet as string;
  const suffix = `/api/x/${worksheetId}`;

  const copyToClipoard = () => {
    navigator.clipboard.writeText(
      `${process.env['NEXT_PUBLIC_HOST']}${suffix}`
    );
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h3" fontWeight={900} data-test="worksheets-header">
        worksheets.dev
      </Typography>
      {worksheetId && (
        <Button
          variant="text"
          endIcon={<CopyAllIcon fontSize="small" />}
          onClick={copyToClipoard}
        >
          {suffix}
        </Button>
      )}
    </Box>
  );
}
