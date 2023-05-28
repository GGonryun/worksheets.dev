import { Box, Typography, Button } from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';

export type HeaderProps = {
  worksheetId: string;
};

export function Header({ worksheetId }: HeaderProps) {
  const suffix = `/api/x/${worksheetId}`;

  const copyToClipoard = () => {
    navigator.clipboard.writeText(`https://worksheets.dev${suffix}`);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h3" fontWeight={900}>
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
