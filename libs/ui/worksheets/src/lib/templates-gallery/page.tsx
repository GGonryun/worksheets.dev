import { Box, Divider, Link, Typography } from '@mui/material';
import { ApplicationAutocomplete } from './application-autocomplete';
import { useState } from 'react';
import { ApplicationDetails } from '../shared/types';
import { trpc } from '@worksheets/trpc/ide';
import AppsIcon from '@mui/icons-material/Apps';
import Button from '@mui/material/Button';
import { FloatingLayout } from '../floating-layout';
import { onlyUnique } from '@worksheets/util/functional';
import { TemplatesGrid } from './templates-grid';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export function TemplatesPage() {
  const [selections, setSelections] = useState<ApplicationDetails[]>([]);
  const { data: applications } = trpc.applications.list.useQuery({});

  return (
    <FloatingLayout secure={false}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={3}
        flexDirection="column"
        gap={1}
      >
        <Typography variant="h2">Template Gallery</Typography>
        <Typography variant="body1" textAlign="center" maxWidth={800}>
          Supercharge your workflows with templates that integrate the tools you
          use every day. Try our ready-to-go worksheets or{' '}
          <Link
            href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
              '/docs/create-worksheet'
            )}`}
          >
            create your own
          </Link>{' '}
          using one of our{' '}
          <Link href="/applications">{applications?.length} applications</Link>.
        </Typography>
      </Box>
      <Divider />

      <Box p={3}>
        <Box display="flex" alignItems="center" gap={6}>
          <ApplicationAutocomplete
            selections={selections}
            onSelect={(newSelections) => setSelections(newSelections)}
          />
          <Box>
            <Button
              variant="contained"
              startIcon={<AppsIcon />}
              href="/applications"
            >
              Applications
            </Button>
          </Box>
        </Box>
        <Box pt={2}>
          <TemplatesGrid
            appIds={selections.map((s) => s.id)}
            onAppClick={(app) =>
              setSelections([...selections, app].filter(onlyUnique))
            }
          />
        </Box>
      </Box>
    </FloatingLayout>
  );
}
