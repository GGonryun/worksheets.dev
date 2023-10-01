import { Container, Divider, Link, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Flex } from '@worksheets/ui-core';
import { ProjectsHeader } from './page-header';
import { BrowseFeaturesCard } from './project-cards/browse-features-card';
import { CreateProjectCard } from './project-cards/create-project-card';
import { CreateProjectSidecar } from './create-project-sidecar';
import React from 'react';
import { ProjectsList } from './projects-list';
import { urls, useUser } from '@worksheets/ui/common';
import { AnonymousConnectionCard } from './project-cards/anonymous-connection-card';

export const ProjectsPage = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Flex column gap={3}>
            <ProjectsHeader />
            <Divider sx={{ mt: 1 }} />
            {!user && <LoginWarning />}
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} md={4} lg={3}>
                {user ? (
                  <CreateProjectCard onClick={() => setOpen(true)} />
                ) : (
                  <AnonymousConnectionCard />
                )}
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

const LoginWarning = () => (
  <Flex column my={-2}>
    <Typography variant="h6" fontWeight={900} sx={{ mt: 2 }} color="error">
      You are not logged in.
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Browse the demo project below or{' '}
      <Link href={urls.app.login}>click here to sign in</Link>.
    </Typography>
  </Flex>
);
