import { Collapse, Divider, Typography } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { FC, useState } from 'react';
import { StandardProductButton, WhiteProductButton } from './product-buttons';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { FeatureBox } from './feature-box';
import { urls } from '@worksheets/ui/common';

const primaryFeatures = [
  {
    title: 'Unified APIs',
    description: 'Access common actions with a single API.',
    logo: '/icons/features/services.svg',
    href: urls.app.features,
  },
  {
    big: true,
    title: 'App Registry',
    description: 'Integrate with hundreds of third-party services.',
    logo: '/icons/features/applications.svg',
    href: urls.app.features,
  },
  {
    beta: true,
    title: 'Code Converter',
    description: 'Translate HTTP requests across programming languages.',
    logo: '/icons/features/converter.svg',
    href: urls.app.features,
  },
];

const secondaryFeatures = [
  {
    beta: true,
    title: 'Connection Vault',
    description: 'Interact with apps on behalf of your users.',
    logo: '/icons/features/vault.svg',
    href: urls.app.features,
  },
  {
    beta: true,
    title: 'Tasks',
    description: 'Orchestrate complex multi-application workflows.',
    logo: '/icons/features/tasks.svg',
    href: urls.app.features,
  },
  {
    beta: true,
    title: 'Schemas',
    description: 'Standardize your data models and data access.',
    logo: '/icons/features/schemas.svg',
    href: urls.app.features,
  },
  {
    beta: true,
    title: 'Events',
    description: 'Real-time communications across applications.',
    logo: '/icons/features/events.svg',
    href: urls.app.features,
  },
];

export const HeroSection: FC = () => {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  return (
    <Flex column gap={1} alignItems="center">
      <TinyLogo src="/logo.svg" borderless area={92} />
      <Typography variant="h4" fontWeight={900}>
        Worksheets.dev
      </Typography>
      <Divider sx={{ width: 120, my: 3 }} />
      <Flex column gap={3} alignItems="center">
        <Flex column alignItems="center">
          <Typography variant="h6" fontWeight={900}>
            An integration platform for developers
          </Typography>
        </Flex>
        <Typography variant="body2" maxWidth={400} textAlign="center">
          Automate your workflows and build integrations with popular
          applications in your favorite programming languages.
        </Typography>
        <Flex gap={1}>
          <StandardProductButton
            sx={{
              px: 4,
            }}
            href={urls.app.contact}
          >
            Try Now
          </StandardProductButton>
          <WhiteProductButton
            sx={{
              px: 4,
            }}
            href={urls.app.contact}
          >
            Request Demo
          </WhiteProductButton>
        </Flex>
        <Flex gap={4} pt={2}>
          {primaryFeatures.map((feature) => (
            <FeatureBox
              key={feature.title}
              {...feature}
              big={!showMoreFeatures && feature.big}
            />
          ))}
        </Flex>
        <Collapse in={showMoreFeatures}>
          <Flex gap={4} pt={2}>
            {secondaryFeatures.map((feature) => (
              <FeatureBox key={feature.title} {...feature} />
            ))}
          </Flex>
        </Collapse>

        <WhiteProductButton
          disableElevation
          disableRipple
          onClick={() => setShowMoreFeatures((prev) => !prev)}
          endIcon={
            showMoreFeatures ? (
              <ExpandLess fontSize="large" />
            ) : (
              <ExpandMore fontSize="large" />
            )
          }
          sx={{ width: 240, mt: 2 }}
        >
          {showMoreFeatures ? 'Show less' : 'All products'}
        </WhiteProductButton>
      </Flex>
    </Flex>
  );
};
