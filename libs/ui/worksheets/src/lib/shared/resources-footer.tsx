import { Box, Typography, Paper, Tooltip, Link } from '@mui/material';
import React, { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HelpIcon from '@mui/icons-material/Help';
import { OpenInNew } from '@mui/icons-material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const ResourcesFooter: React.FC<{ apps?: boolean }> = ({ apps }) => (
  <Grid
    container
    spacing={2}
    alignContent="center"
    justifyContent="center"
    width="100%"
  >
    <Grid xs={12} sm={6} md={4}>
      <ResourceCard
        title="Pricing"
        caption="Pay as you go"
        icon={<LocalOfferOutlinedIcon color="primary" />}
        href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/pricing')}`}
        openInNewTab
      />
    </Grid>
    <Grid xs={12} sm={6} md={4}>
      <ResourceCard
        title="Support"
        caption="Get help now"
        helpText="A live agent is standing by to help you."
        icon={<LiveHelpOutlinedIcon color="primary" />}
        href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}`}
        openInNewTab
      />
    </Grid>
    <Grid xs={12} sm={6} md={4}>
      <ResourceCard
        title="Tutorials"
        caption="Learn more"
        helpText="Learn more about how applications are used."
        icon={<ReceiptLongOutlinedIcon color="primary" />}
        href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/docs/quick-start')}`}
        openInNewTab
      />
    </Grid>
  </Grid>
);

const ResourceCard: React.FC<{
  title: string;
  caption: string;
  icon: ReactNode;
  helpText?: string;
  href?: string;
  openInNewTab?: boolean;
}> = ({ title, caption, icon, helpText, href, openInNewTab }) => (
  <Paper elevation={2}>
    <Box display="flex" px={3} py={2} gap={2}>
      <Box>{icon}</Box>
      <Box>
        <Box display="flex" gap={2} alignItems="center">
          <Typography variant="body1" fontWeight={900}>
            {title}
          </Typography>
          {helpText && (
            <Tooltip
              placement="top"
              title={helpText}
              disableHoverListener={!helpText}
            >
              <HelpIcon fontSize="small" color="primary" />
            </Tooltip>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {!href ? (
            caption
          ) : (
            <Link href={href} target={openInNewTab ? '_blank' : '_top'}>
              {caption} {openInNewTab && <OpenInNew sx={{ height: 14 }} />}
            </Link>
          )}
        </Typography>
      </Box>
    </Box>
  </Paper>
);
