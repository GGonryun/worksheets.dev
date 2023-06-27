import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  Collapse,
  ButtonBase,
  Tooltip,
  Link,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { trpc } from '@worksheets/trpc/ide';
import { FloatingLayout } from '../floating-layout';
import { TinyLogo } from '../shared/tiny-logo';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CodeEditor } from '@worksheets/ui/code-editor';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HelpIcon from '@mui/icons-material/Help';
import { OpenInNew } from '@mui/icons-material';
import { useClipboard } from '@worksheets/ui/common';

export const TemplateDetailsPage: React.FC<{ templateId: string }> = ({
  templateId,
}) => {
  const { push } = useRouter();
  const { data: template } = trpc.templates.get.useQuery(templateId);
  const clipboard = useClipboard();
  return (
    <FloatingLayout>
      <Box p={3}>
        <Box
          pb={1}
          ml={-1.25}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton size="small" onClick={() => push('/templates')}>
            <ArrowBackOutlinedIcon fontSize="large" />
          </IconButton>
          <Box display="flex" gap={2} alignItems="center">
            <IconButton size="small">
              <ThumbDownOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ThumbUpOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box pt={2} display="flex" justifyContent="space-between">
          <Box flexGrow={1}>
            <Typography variant="h4">{template?.description}</Typography>
          </Box>
          <Box pt={1} display="flex" gap={2} flexDirection="column">
            <Box display="flex" gap={1} alignItems="center">
              {template?.apps.map(({ id, logo, name }) => (
                <IconButton
                  size="small"
                  key={name}
                  href={`/applications/${id}`}
                >
                  <TinyLogo area={30} label={name} src={logo} borderless />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        <Box py={3}>
          <Paper elevation={6}>
            <Box
              p={1}
              pl={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Worksheet</Typography>
              <Button variant="contained" startIcon={<SendIcon />}>
                Create
              </Button>
            </Box>
            <Divider />

            <CodeEditor
              onCopy={() => clipboard.copy(template?.text ?? '')}
              height="500px"
              width="100%"
              value={template?.text ?? ''}
              disabled={true}
              mode={'yaml'}
              theme={'light'}
            />
          </Paper>
        </Box>

        {template?.inputs.map((input, i) => (
          <SampleText
            label={`Sample Input #${i + 0}`}
            text={JSON.stringify(input, null, 2)}
          />
        ))}
        {template?.outputs.map((output, i) => (
          <SampleText
            label={`Sample Output #${i + 0}`}
            text={JSON.stringify(output, null, 2)}
          />
        ))}
      </Box>
      <Divider />
      <Box
        p={3}
        pb={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={2}
      >
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
              caption="free of charge, forever"
              icon={<LocalOfferOutlinedIcon color="primary" />}
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
            <ResourceCard
              title="Applications"
              caption="Browse more apps"
              icon={<HubOutlinedIcon color="primary" />}
              href="/applications"
            />
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
      </Box>
    </FloatingLayout>
  );
};

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

const SampleText: React.FC<{ label: string; text: string }> = ({
  label,
  text,
}) => {
  const [open, setOpen] = useState(false);
  const clipboard = useClipboard();
  return (
    <Box py={3}>
      <Paper elevation={6}>
        <ButtonBase onClick={() => setOpen(!open)} sx={{ width: '100%' }}>
          <Box
            width="100%"
            py={1}
            px={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">{label}</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
            </Box>
          </Box>
        </ButtonBase>
        <Divider />
        <Collapse in={open}>
          <CodeEditor
            onCopy={() => clipboard.copy(text ?? '')}
            height="200px"
            width="100%"
            value={text ?? ''}
            disabled={true}
            mode={'yaml'}
            theme={'light'}
          />
        </Collapse>
      </Paper>
    </Box>
  );
};
