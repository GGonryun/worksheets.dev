import { Box, Typography, Paper, Tooltip, Link } from '@mui/material';
import React, { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HelpIcon from '@mui/icons-material/Help';
import ScannerIcon from '@mui/icons-material/ScannerOutlined';
import { OpenInNew } from '@mui/icons-material';

export const ResourcesFooter: React.FC<{ apps?: boolean }> = ({ apps }) => (
  <Grid
    container
    spacing={2}
    alignContent="center"
    justifyContent="center"
    width="100%"
  >
    <Grid md={3}>
      <ResourceCard
        title="Pricing"
        caption="Pay as you go"
        icon={<LocalOfferOutlinedIcon color="primary" />}
        href="/pricing"
        openInNewTab
      />
    </Grid>
    <Grid md={3}>
      <ResourceCard
        title="Support"
        caption="Get help now"
        helpText="A live agent is standing by to help you."
        icon={<LiveHelpOutlinedIcon color="primary" />}
        href="/support"
        openInNewTab
      />
    </Grid>
    <Grid md={3}>
      {apps ? (
        <ResourceCard
          title="Applications"
          caption="Browse more apps"
          icon={<HubOutlinedIcon color="primary" />}
          href="/applications"
        />
      ) : (
        <ResourceCard
          title="Templates"
          caption="Browse templates"
          icon={<ScannerIcon color="primary" />}
          href="/templates"
        />
      )}
    </Grid>
    <Grid md={3}>
      <ResourceCard
        title="Syntax Guide"
        caption="Learn more"
        helpText="Learn more about how worksheets are written."
        icon={<ReceiptLongOutlinedIcon color="primary" />}
        href="/docs/syntax-guide"
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
