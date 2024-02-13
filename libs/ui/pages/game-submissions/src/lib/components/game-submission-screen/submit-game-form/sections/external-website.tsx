import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { PrefixTextField } from '@worksheets/ui/components/inputs';
import { FC } from 'react';

import { useGameSubmissionFormContext } from '../../../form-context';

export const ExternalWebsiteSection: FC = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();
  const isExternalWebsite = values.projectType === 'EXTERNAL';

  const id = 'externalWebsiteUrl';
  const error = errors[id];
  const value = values[id];

  return (
    <Box
      flexDirection="column"
      gap={2}
      display={isExternalWebsite ? 'flex' : 'none'}
    >
      <Typography variant="h5" mb={-1}>
        External Website
      </Typography>

      <FormHelperText>
        <Box
          component="span"
          color={error ? 'error.main' : 'text.secondary'}
          fontWeight={900}
        >
          Embed an external web page on our website.
        </Box>{' '}
        &#8212; Your web page must be fully responsive across a wide variety of
        devices. For more information on our embedded web page requirements see
        the{' '}
        <Link href="/help/developers#how-do-i-embed-a-web-page" target="_blank">
          FAQ: 'How do I embed a web page?'{' '}
          <OpenInNewIcon fontSize="inherit" sx={{ mb: '-2px' }} />
        </Link>
        .
      </FormHelperText>

      <PrefixTextField
        id={id}
        value={value}
        size="small"
        required
        label="URL"
        helperText={
          error ??
          'A standalone URL where your game is hosted, this website will be embedded in our site.'
        }
        prefix={`https://`}
        error={Boolean(error)}
        onChange={(e) => {
          setFieldValue(id, e.target.value);
        }}
      />
    </Box>
  );
};
