import { KeyboardBackspace } from '@mui/icons-material';
import { Box, Link, NativeSelect, Paper } from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import { Flex } from '@worksheets/ui-core';
import { useLayout } from '@worksheets/ui/common';
import { useRouter } from 'next/router';

export const TableOfContents: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ methods, app }) => {
  const { push } = useRouter();

  const { isMobile } = useLayout();

  if (isMobile)
    return (
      <Paper sx={{ width: '100%' }} elevation={0} variant="outlined">
        <NativeSelect
          variant="outlined"
          value={0}
          placeholder="Select a method"
          fullWidth
          onChange={(e) => push(`#${e.target.value}`)}
          sx={{ p: 1 }}
        >
          <option value={1}>Table of Contents</option>
          <option value={app.appId}>API Overview</option>
          {methods.map((m) => (
            <option key={m.methodId} value={m.methodId}>
              {m.label}
            </option>
          ))}
        </NativeSelect>
      </Paper>
    );
  return (
    <Box
      sx={{
        position: 'sticky',
        top: '32px',
        maxWidth: 400,
        width: 200,
        gap: 3,
        p: 3,
        pt: 7,
        display: 'block',
      }}
    >
      <Flex column pl={2}>
        <Link
          variant="body2"
          fontWeight={900}
          color="inherit"
          href={`#${app.appId}`}
          underline="hover"
          sx={{ mt: 1 }}
        >
          API Overview
        </Link>
        {methods.map((m) => (
          <Link
            key={m.methodId}
            variant="body2"
            color="default"
            href={`#${m.methodId}`}
            underline="hover"
            sx={{ pl: 1.5, mt: 1 }}
          >
            {m.label}
          </Link>
        ))}
        <Link
          variant="body2"
          color="inherit"
          href="/applications"
          sx={{ mt: 1, pt: 3 }}
        >
          <Flex gap={1}>
            <KeyboardBackspace sx={{ fontSize: 14 }} />
            Applications
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};