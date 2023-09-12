import { AddCircle } from '@mui/icons-material';
import { Box, ButtonBase, Typography, Collapse } from '@mui/material';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';
import { ReactNode, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const ApplicationInformation: React.FC<{
  connection: GetConnectionDetailsResponse;
}> = ({ connection }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <CollapsableTextSection title="Description">
        <MarkdownWrapper>{connection.details.description}</MarkdownWrapper>
      </CollapsableTextSection>
      <CollapsableTextSection title="Instructions">
        <MarkdownWrapper>{connection.details.instructions}</MarkdownWrapper>
      </CollapsableTextSection>
      <CollapsableTextSection title="Security">
        <MarkdownWrapper>{connection.details.security}</MarkdownWrapper>
      </CollapsableTextSection>
    </Box>
  );
};

export const CollapsableTextSection: React.FC<{
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <>
      <ButtonBase onClick={() => setOpen((o) => !o)}>
        <Box display="flex" alignItems="center" gap={2} py={0.5} px={1}>
          <AddCircle color="primary" />
          <Typography fontWeight={900} color="primary">
            {title}
          </Typography>
        </Box>
      </ButtonBase>
      <Box pl={6}>
        <Collapse in={open} sx={{ py: 0.5 }}>
          <Box sx={{ py: 1 }}>{children}</Box>
        </Collapse>
      </Box>
    </>
  );
};

export const MarkdownWrapper: React.FC<{ children: string }> = ({
  children,
}) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <Typography variant="body2">{children}</Typography>
        ),
        li: ({ children }) => (
          <li>
            <Typography variant="body2">{children}</Typography>
          </li>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
