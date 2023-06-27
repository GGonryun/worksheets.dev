import {
  Box,
  ButtonBase,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { trpc } from '@worksheets/trpc/ide';
import { FloatingLayout } from '../floating-layout';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import { ReactNode, useState } from 'react';
import { SidecarLayout } from '../shared/sidecar-layout';
import { ApplicationCard } from './application-card';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TuneIcon from '@mui/icons-material/Tune';

export function ApplicationsGalleryPage() {
  const { data: applications } = trpc.applications.list.useQuery({});
  const [requesting, setRequesting] = useState(false);

  return (
    <>
      <SidecarLayout
        open={requesting}
        onClose={() => setRequesting(false)}
        title={'Request an application'}
      >
        TODO: A form for requesting applications.
      </SidecarLayout>
      <FloatingLayout>
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
                label="Browse templates"
                caption="Search for worksheets"
                icon={<SearchIcon fontSize="large" />}
                href={'/templates'}
              />
            </Grid>
            <Grid md={4}>
              <SpotlightButton
                label="Customize workflows"
                caption="Learn the worksheet syntax"
                icon={<TuneIcon fontSize="large" />}
                href={'/docs/create-worksheet'}
              />
            </Grid>
            <Grid md={4}>
              <SpotlightButton
                label="Request new apps"
                caption="Learn the syntax"
                icon={<PlaylistAddIcon fontSize="large" />}
                onClick={() => setRequesting(true)}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box p={3}>
          <TextField
            placeholder="Search for applications by name"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon color="disabled" sx={{ mr: 1 }} />,
            }}
          />
        </Box>
        <Box px={3} pb={6}>
          <Grid container spacing={2}>
            {applications?.map((a) => (
              <Grid xs={3} key={a.id}>
                <ApplicationCard application={a} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FloatingLayout>
    </>
  );
}

const SpotlightButton: React.FC<{
  label: string;
  caption: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
}> = ({ label, caption, icon, href, onClick }) => (
  <Paper>
    <ButtonBase href={href ?? ''} onClick={onClick} sx={{ width: '100%' }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        px={2}
      >
        <Box
          height="70px"
          alignItems="center"
          display="flex"
          justifyContent="flex-start"
          gap={2}
        >
          <Box>
            <Box
              border={(theme) => `1px solid ${theme.palette.divider}`}
              borderRadius={1}
              p={0.25}
            >
              {icon}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Box>
              <Typography variant="body2" fontWeight={900}>
                {label}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">{caption}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  </Paper>
);
