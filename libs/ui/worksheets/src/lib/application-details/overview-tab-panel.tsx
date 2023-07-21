import { Box, Button, Typography } from '@mui/material';
import { MethodDetailsList, MethodsGallery } from './method-gallery';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import Link from 'next/link';
import { OpenInNew } from '@mui/icons-material';

export const OverviewTabPanel: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app, methods }) => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box>
        <Link href="#overview">
          <Typography variant="h4" fontWeight={900} sx={{ py: 1 }}>
            Overview
          </Typography>
        </Link>
        <Typography whiteSpace="pre-line">{app.overview}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={3}>
        <Button
          size="small"
          variant="contained"
          endIcon={<OpenInNew />}
          href={app.tutorial}
          target="_blank"
        >
          Quick Start
        </Button>
      </Box>
      <Box id="methods">
        <Link href="#methods">
          <Typography variant="h4" fontWeight={900} sx={{ py: 1 }}>
            Methods
          </Typography>
        </Link>
        <MethodsGallery methods={methods} app={app} />
      </Box>
      <Box id="details">
        <Link href="#details">
          <Typography variant="h4" fontWeight={900} sx={{ py: 1 }}>
            Details
          </Typography>
        </Link>
        <MethodDetailsList methods={methods} />
      </Box>
    </Box>
  );
};
