import { Box } from '@mui/material';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { MethodExampleData } from '@worksheets/schemas-applications';
import { useState } from 'react';
import { TinyToggle } from '@worksheets/ui-basic-style';
import { CodeBlock } from '@worksheets/ui/common';
import { Flex } from '@worksheets/ui-core';

export const MethodExampleDataViewer = ({
  data,
}: {
  data: MethodExampleData;
}) => {
  const [active, setActive] = useState(0);

  const isEnabled = (index: number) => index === active;
  const toggle = (index: number) => () => setActive(index);

  const offset = 1;

  return (
    <Box>
      <Flex gap={1}>
        <TinyToggle checked={isEnabled(0)} onClick={toggle(0)}>
          Schema
        </TinyToggle>
        {data.examples.map((_, i) => (
          <TinyToggle
            checked={isEnabled(i + offset)}
            onClick={toggle(i + offset)}
          >
            Example {i + offset}
          </TinyToggle>
        ))}
      </Flex>
      {active === 0 ? (
        <Box pl={2}>
          <JsonSchemaViewer
            defaultExpandedDepth={1}
            renderRootTreeLines={false}
            disableCrumbs={true}
            emptyText="No schema defined"
            schema={data.schema}
          />
        </Box>
      ) : (
        <Box pt={1}>
          <CodeBlock language="json">
            {data.examples[active - offset]}
          </CodeBlock>
        </Box>
      )}
    </Box>
  );
};
