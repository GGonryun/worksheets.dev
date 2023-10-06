import { Add } from '@mui/icons-material';
import { Box, Link, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { CodeBlock, urls, useLayout } from '@worksheets/ui/common';
import { Flex } from '@worksheets/ui-core';
import { WhiteProductButton } from '../product-buttons';
import { MarketingSection } from '../marketing-section';
import { programmingLanguages, curlSample } from './data';
import { ApplicationEndpoints } from './application-endpoints';
import { ProgrammingLanguages } from './programming-languages';

export const DeveloperToolsSection = () => {
  const theme = useTheme();

  const { isMobile } = useLayout();

  return (
    <MarketingSection
      title="Easy to use APIs and SDKs"
      description="We provide API documentation and cross-platform app development SDKs
    to help you get started quickly."
      action={{
        text: 'Read the manual',
        href: urls.docs.home,
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
        <ApplicationEndpoints />
      </Flex>

      <Flex column py={1} gap={1} alignItems="center">
        <Typography variant="body1" fontWeight={900}>
          Programming Language
        </Typography>
        <ProgrammingLanguages />
      </Flex>

      <Box maxWidth={600}>
        <CodeBlock language="bash">{curlSample}</CodeBlock>
      </Box>
    </MarketingSection>
  );
};
