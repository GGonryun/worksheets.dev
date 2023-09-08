import { Box, Divider, Typography } from '@mui/material';
import { CodeBlock } from '@worksheets/ui/common';
import { ApplicationMethodItem } from '../../../shared/types';
import React from 'react';
import { MissingFeatureNotice } from '../../../shared/missing-feature-notice';
import { TinyToggle } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';

enum CodeLanguages {
  curl = 'curl',
  typescript = 'typescript',
  python = 'python',
  golang = 'golang',
  java = 'java',
  csharp = 'csharp',
}

const labels = {
  [CodeLanguages.curl]: 'cURL',
  [CodeLanguages.typescript]: 'TypeScript',
  [CodeLanguages.python]: 'Python',
  [CodeLanguages.golang]: 'GoLang',
  [CodeLanguages.java]: 'Java',
  [CodeLanguages.csharp]: 'C#',
};

const index = {
  [CodeLanguages.curl]: 0,
  [CodeLanguages.typescript]: 1,
  [CodeLanguages.python]: 2,
  [CodeLanguages.golang]: 3,
  [CodeLanguages.java]: 4,
  [CodeLanguages.csharp]: 5,
};

export const CodeSamplesSection: React.FC<{
  method: ApplicationMethodItem;
}> = ({ method }) => {
  const [active, setActive] = React.useState<CodeLanguages>(CodeLanguages.curl);

  return (
    <Flex column width="100%" gap={1}>
      <Typography variant="body1" fontWeight={900}>
        Code Samples
      </Typography>
      <Divider />
      <Flex gap={1}>
        {Object.values(CodeLanguages).map((lang) => (
          <TinyToggle
            key={lang}
            color="secondary"
            checked={active === lang}
            onClick={() => setActive(lang)}
          >
            {labels[lang as CodeLanguages]}
          </TinyToggle>
        ))}
      </Flex>
      {active === CodeLanguages.curl && (
        <CodeBlock language="bash">{method.examples.code.curl}</CodeBlock>
      )}
      {active !== CodeLanguages.curl && (
        <Box p={3}>
          <MissingFeatureNotice
            avatarId={index[active]}
            feature={`implementing more code samples for our documentation page`}
            link={{
              text: `Request early access to this feature`,
              href: `/contact-us`,
            }}
          />
        </Box>
      )}
    </Flex>
  );
};
