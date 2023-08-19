import { CopyAll } from '@mui/icons-material';
import { Typography, Button, Paper } from '@mui/material';
import { Flex, useClipboard } from '@worksheets/ui/common';

export const LabeledMonoSpaceTextBox: React.FC<{
  title?: string;
  code: string;
  allowCopy?: boolean;
}> = ({ title, code, allowCopy }) => {
  const { copy } = useClipboard();

  return (
    <Flex column gap={1}>
      <Flex justifyContent="space-between">
        {title && (
          <Typography variant="body1" fontWeight={900}>
            {title}
          </Typography>
        )}
        {allowCopy && (
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            sx={{
              p: 0.25,
              py: 0,
              px: 1,
              m: 0,
              borderColor: 'grey.700',
              color: 'grey.700',
            }}
            startIcon={<CopyAll fontSize="small" />}
            onClick={() => copy(code)}
          >
            Copy
          </Button>
        )}
      </Flex>
      <MonoSpaceTextBox code={code} />
    </Flex>
  );
};

export const MonoSpaceTextBox: React.FC<{
  code: string;
  fullWidth?: boolean;
  borderless?: boolean;
}> = ({ code, fullWidth, borderless }) => (
  <Paper
    sx={(theme) => ({
      backgroundColor: theme.palette.grey[100],
      px: 1,
      py: 0.25,
      width: fullWidth ? '100%' : undefined,
    })}
    variant={borderless ? undefined : 'outlined'}
    elevation={0}
    square={borderless ? true : false}
  >
    <Typography
      fontFamily="monospace"
      variant="body2"
      whiteSpace="pre-line"
      sx={{ wordWrap: 'break-word' }}
    >
      {code}
    </Typography>
  </Paper>
);
