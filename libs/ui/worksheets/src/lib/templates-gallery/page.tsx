import { Box, Divider, Link, Typography } from '@mui/material';
import { ApplicationAutocomplete } from './application-autocomplete';
import { useState } from 'react';
import { ApplicationDetails } from '../shared/types';
import { trpc } from '@worksheets/trpc/ide';
import HubIcon from '@mui/icons-material/Hub';
import Button from '@mui/material/Button';
import { TemplateCard } from './template-card';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FloatingLayout } from '../floating-layout';
import { onlyUnique } from '@worksheets/util/functional';

export function TemplatesPage() {
  const [selections, setSelections] = useState<ApplicationDetails[]>([]);

  const { data: applications } = trpc.applications.list.useQuery({});
  const { data: templates } = trpc.templates.list.useQuery({
    appIds: selections.map((s) => s.id),
  });
  return (
    <FloatingLayout>
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
          <Link href="/docs/create-worksheet">create your own</Link> using one
          of our {applications?.length} apps.
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
              variant="outlined"
              startIcon={<HubIcon />}
              href="/applications"
            >
              Applications
            </Button>
          </Box>
        </Box>
        <Box pt={2}>
          <Grid container spacing={2}>
            {templates?.map((t) => (
              <Grid xs={4} key={t.id}>
                <TemplateCard
                  template={t}
                  onAppClick={(app) =>
                    setSelections([...selections, app].filter(onlyUnique))
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </FloatingLayout>
  );
}
