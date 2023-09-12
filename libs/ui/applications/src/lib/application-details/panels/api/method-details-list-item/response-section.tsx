import { Divider, Typography } from '@mui/material';
import { TinyToggle } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { useState } from 'react';
import { MethodExampleDataViewer } from './method-example-data-viewer';
import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { uniqueArray } from '@worksheets/util/arrays';
import { ApplicationMethodDetailsItem } from '@worksheets/schemas-applications';

export const ResponseSection = ({
  method,
}: {
  method: ApplicationMethodDetailsItem;
}) => {
  const [active, setActive] = useState('200');
  return (
    <Flex column width="100%" gap={1}>
      <ResponseHeader
        value={active}
        codes={Object.keys(method.examples.response)}
        onSelect={(v) => setActive(v)}
      />
      <Divider />
      <MethodExampleDataViewer data={method.examples.response[active]} />
    </Flex>
  );
};

const responseLabels: Record<string, string> = {
  '200': 'Okay',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '409': 'Conflict',
  '412': 'Precondition Failed',
  '429': 'Too Many Requests',
  '500': 'Internal Server Error',
  '503': 'Service Unavailable',
};

const STATUS_OKAY = '200';

const ResponseHeader = ({
  value,
  codes,
  onSelect,
}: {
  value: string;
  codes: string[];
  onSelect: (value: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const filtered = expanded
    ? codes
    : // get all the codes except the first 3 and always include the current selection if it's outside the menu array
      uniqueArray(codes.filter((c, i) => i < 3).concat(value));

  return (
    <Flex gap={1} wrap>
      <Typography variant="body1" fontWeight={900}>
        Response
      </Typography>
      {filtered.map((code) => (
        <TinyToggle
          checked={code === value}
          color={code === STATUS_OKAY ? 'success' : 'error'}
          onClick={() => onSelect(code)}
        >
          {code} {responseLabels[code] ?? 'Unknown'}
        </TinyToggle>
      ))}
      <TinyToggle
        checked
        onClick={() => setExpanded(!expanded)}
        color="inherit"
        startIcon={expanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      >
        {expanded ? 'Less' : 'More'}
      </TinyToggle>
    </Flex>
  );
};
