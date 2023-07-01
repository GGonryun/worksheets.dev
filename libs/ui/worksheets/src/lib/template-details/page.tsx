import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  Collapse,
  ButtonBase,
} from '@mui/material';
import React, { useState } from 'react';
import { trpc } from '@worksheets/trpc/ide';
import { FloatingLayout } from '../floating-layout';
import { TinyLogo } from '../shared/tiny-logo';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SendIcon from '@mui/icons-material/Send';
import { CodeEditor } from '@worksheets/ui/code-editor';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useRouter } from 'next/router';
import { useClipboard } from '@worksheets/ui/common';
import { ResourcesFooter } from '../shared/resources-footer';

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
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() =>
                  push(`/worksheets/create?templateId=${templateId}`)
                }
              >
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
            key={i}
            label={`Sample Input #${i + 0}`}
            text={JSON.stringify(input, null, 2)}
          />
        ))}

        {template?.outputs.map((output, i) => (
          <SampleText
            key={i}
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
        <ResourcesFooter apps />
      </Box>
    </FloatingLayout>
  );
};

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
