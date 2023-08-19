import { Box, Divider, TextField, Tooltip, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc/ide';
import { FloatingLayout } from '../floating-layout';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import { ApplicationCard } from './application-card';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { SpotlightButton } from '../shared/spotlight-button';
import { Emoji } from '@worksheets/ui/common';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export function ApplicationsGalleryPage() {
  const { data: applications } = trpc.applications.list.useQuery({
    gallery: true,
  });

  return (
    <FloatingLayout secure={false}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={3}
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h2">Application Gallery</Typography>
        <Grid
          container
          spacing={2}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Grid md={4}>
            <SpotlightButton
              label="Learn more"
              caption="Read our documentation"
              icon={<ArticleOutlinedIcon fontSize="large" />}
              href={SERVER_SETTINGS.WEBSITES.DOCS_URL()}
            />
          </Grid>
          <Grid md={4}>
            <SpotlightButton
              label="Request new apps"
              caption="Add your app to the gallery"
              icon={<PlaylistAddIcon fontSize="large" />}
              href={SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box p={3}>
        <Tooltip
          title={
            <Box>
              We only support a few applications, do you really need this?{' '}
              <Emoji code="thinking" />
            </Box>
          }
        >
          <span>
            <TextField
              placeholder="Search for applications by name"
              fullWidth
              disabled
              InputProps={{
                startAdornment: <SearchIcon color="disabled" sx={{ mr: 1 }} />,
              }}
            />
          </span>
        </Tooltip>
      </Box>
      <Box px={3} pb={6}>
        <Grid container spacing={2}>
          {applications?.map((a) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={a.id}>
              <ApplicationCard application={a} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </FloatingLayout>
  );
}
