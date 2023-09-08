import { Add } from '@mui/icons-material';
import { Box, Link, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { CodeBlock } from '@worksheets/ui/common';
import { Flex } from '@worksheets/ui-core';
import { WhiteProductButton } from './product-buttons';
import { MarketingSection } from './marketing-section';

export const DeveloperToolsSection = () => {
  const theme = useTheme();

  return (
    <MarketingSection
      title="Easy to use APIs and SDKs"
      description="We provide API documentation and cross-platform app development SDKs
    to help you get started quickly."
      action={{
        text: 'Read the manual',
        href: '/documentation',
      }}
      footer={
        <Flex justifyContent="center" alignItems="center" p={3} gap={6}>
          <Flex gap={1}>
            <Flex column gap={1}>
              <Flex gap={1}>
                <TinyLogo borderless area={45} src="/art/brands/aws.svg" />
                <TinyLogo
                  borderless
                  area={45}
                  src="/art/brands/digitalocean.svg"
                />
              </Flex>
              <Flex gap={1}>
                <TinyLogo borderless area={45} src="/art/brands/gcp.svg" />
                <TinyLogo
                  borderless
                  area={45}
                  src="/art/brands/kubernetes.svg"
                />
              </Flex>
            </Flex>
            <Add fontSize="large" />
            <TinyLogo borderless area={132} src="/logo.svg" />
          </Flex>
          <Flex column maxWidth={320}>
            <Typography variant="h6" fontWeight={900}>
              Self-host worksheets
            </Typography>
            <Typography variant="body2">
              Worksheets can be self-hosted on your own infrastructure. This
              allows you to keep your data private and secure.
            </Typography>
            <Link pt={3} href="/contact">
              Let's talk about it
            </Link>
          </Flex>
        </Flex>
      }
    >
      <Flex column pt={1} gap={1} alignItems="center">
        <Typography variant="body1" fontWeight={900}>
          Application Endpoint
        </Typography>
        <Flex gap={1}>
          {apiEndpoint.map((p) => (
            <Tooltip
              title="Coming soon"
              key={p.id}
              disableHoverListener={p.id === 'create-user'}
            >
              <span>
                <WhiteProductButton
                  disabled={p.id !== 'create-user'}
                  key={p.id}
                  color="inherit"
                  sx={
                    p.id === 'create-user'
                      ? {
                          backgroundColor: alpha(
                            theme.palette.primary.light,
                            0.2
                          ),
                        }
                      : undefined
                  }
                  startIcon={<TinyLogo area={24} src={p.logo} />}
                >
                  {p.name}
                </WhiteProductButton>
              </span>
            </Tooltip>
          ))}
        </Flex>
      </Flex>

      <Flex column py={1} gap={1} alignItems="center">
        <Typography variant="body1" fontWeight={900}>
          Programming Language
        </Typography>
        <Flex pb={1} gap={1}>
          {programmingLanguages.map((p) => (
            <Tooltip
              title="Coming soon"
              key={p.id}
              disableHoverListener={p.id === 'bash'}
            >
              <span>
                <WhiteProductButton
                  disabled={p.id !== 'bash'}
                  key={p.id}
                  color="inherit"
                  sx={
                    p.id === 'bash'
                      ? {
                          backgroundColor: alpha(
                            theme.palette.primary.light,
                            0.2
                          ),
                        }
                      : undefined
                  }
                  startIcon={<TinyLogo area={24} src={p.logo} />}
                >
                  {p.name}
                </WhiteProductButton>
              </span>
            </Tooltip>
          ))}
        </Flex>
      </Flex>
      <Box maxWidth={600}>
        <CodeBlock language="bash">{curlSample}</CodeBlock>
      </Box>
    </MarketingSection>
  );
};

const apiEndpoint = [
  {
    id: 'create-user',
    appId: 'fullstory',
    name: 'Create User',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/fullstory.svg',
  },
  {
    id: 'track-event',
    appId: 'segment',
    name: 'Track Event',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/segment.svg',
  },
  {
    id: 'create-vault',
    appId: 'worksheets',
    name: 'Create Vault',
    logo: '/logo.svg',
  },
  {
    id: 'list-user-sessions',
    appId: 'fullstory',
    name: 'List User Sessions',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/fullstory.svg',
  },
  {
    id: 'send-email',
    appId: 'gmail',
    name: 'Send Email',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
  },
  {
    id: 'create-incident',
    appId: 'pagerduty',
    name: 'Create Incident',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/pagerduty.svg',
  },
];

const programmingLanguages = [
  {
    id: 'bash',
    name: 'cURL',
    logo: '/art/languages/bash.svg',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    logo: '/art/languages/js.svg',
  },
  {
    id: 'go',
    name: 'Go',
    logo: '/art/languages/go.svg',
  },
  {
    id: 'java',
    name: 'Java',
    logo: '/art/languages/java.svg',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    logo: '/art/languages/kotlin.svg',
  },
  {
    id: 'python',
    name: 'Python',
    logo: '/art/languages/python.svg',
  },
  {
    id: 'ruby',
    name: 'Ruby',
    logo: '/art/languages/ruby.svg',
  },
  {
    id: 'rust',
    name: 'Rust',
    logo: '/art/languages/rust.svg',
  },
];

const curlSample = `
curl 
--request POST 'http://registry.worksheets.dev/v1/fullstory/users'
--header 'Content-Type: application/json'
--header 'Authorization: Bearer <WORKSHEETS_API_KEY>'
-d {
  "input": {
    "userId": "xyz123",
    "displayName": "Daniel Falko",
    "email": "daniel.falko@example.com",
    "properties": {
      "pricingPlan": "paid",
      "popupHelp": true,
      "totalSpent": 14.55
    }
  },
  "context": {
    "apiKey": "YOUR_FULLSTORY_API_KEY"
  }
}
`.trim();
