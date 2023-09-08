import { Container, Divider, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Flex } from '@worksheets/ui-core';
import { ProjectsHeader } from './page-header';
import { BrowseFeaturesCard } from './project-cards/browse-features-card';
import { CreateProjectCard } from './project-cards/create-project-card';
import { CreateProjectSidecar } from './create-project-sidecar';
import React from 'react';
import { ProjectsList } from './projects-list';

export const ProjectsPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Flex column gap={3}>
            <ProjectsHeader />
            <Divider sx={{ mt: 1 }} />
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} md={4} lg={3}>
                <CreateProjectCard onClick={() => setOpen(true)} />
              </Grid>
              <ProjectsList />
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={10} lg={8}>
                <BrowseFeaturesCard />
              </Grid>
            </Grid>
          </Flex>
        </Paper>
      </Container>
      <CreateProjectSidecar open={open} onClose={() => setOpen(false)} />
    </>
  );
};
