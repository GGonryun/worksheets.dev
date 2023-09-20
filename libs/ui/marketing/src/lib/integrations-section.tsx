import { ButtonBase, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { ApplicationBasics } from '@worksheets/schemas-applications';
import { TinyButton, TinyLogo } from '@worksheets/ui-basic-style';
import { growOnHoverMixin } from './mixins';
import { MarketingSection } from './marketing-section';
import { urls } from '@worksheets/ui/common';

const letters = [
  ...'0-9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' '),
];

export const IntegrationsSection: FC = () => (
  <MarketingSection
    title="Integrate with your favorite apps"
    description={`One API to rule them all! And by them, we mean your favorite apps.`}
    action={{
      text: 'All applications',
      href: '/applications',
    }}
    footer={
      <Typography variant="body2" textAlign="center" py={2}>
        Don't see the app you're looking for?{' '}
        <Link
          variant="body2"
          component="a"
          color="primary"
          href={urls.app.contact}
          underline="hover"
        >
          Request it here.
        </Link>
      </Typography>
    }
  >
    <Flex column centered gap={4}>
      <Flex column centered gap={1}>
        <Typography fontWeight={900} variant="caption">
          See more apps
        </Typography>
        <Flex gap={0} wrap centered px={10}>
          {letters.map((letter) => (
            <TinyButton
              key={letter}
              href={urls.app.applications}
              sx={{ px: 1, py: 0, m: 0 }}
            >
              <Typography variant="body2" color="text.secondary" key={letter}>
                {letter}
              </Typography>
            </TinyButton>
          ))}
        </Flex>
      </Flex>
      <Flex centered wrap gap={3} pt={2}>
        {featuredIntegrations.map((integration) => (
          <IntegrationItem key={integration.id} {...integration} />
        ))}
      </Flex>
    </Flex>
  </MarketingSection>
);

const featuredIntegrations = [
  {
    id: 'fullstory',
    name: 'FullStory',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/fullstory.svg',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
  },
  {
    id: 'giphy',
    name: 'Giphy',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/giphy.svg',
  },
  {
    id: 'sinch',
    name: 'Sinch',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/sinch.svg',
  },
  {
    id: 'twilio',
    name: 'Twilio',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/twilio.svg',
  },
  {
    id: 'notion',
    name: 'Notion',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/notion.svg',
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/pagerduty.svg',
  },
  {
    id: 'slack',
    name: 'Slack',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/slack.svg',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/openai-svgrepo-com.svg',
  },
  {
    id: 'segment',
    name: 'Segment',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/segment.svg',
  },
];

type FeaturedIntegration = Omit<ApplicationBasics, 'description'>;

const IntegrationItem: FC<FeaturedIntegration> = ({ logo, name, id }) => (
  <ButtonBase
    href={`/applications/${id}`}
    sx={{
      px: 2,
      ...growOnHoverMixin(),
    }}
  >
    <Flex alignItems="center" column gap={1.5}>
      <TinyLogo src={logo} borderless area={60} />
      <Typography variant="body2" fontWeight={900}>
        {name}
      </Typography>
    </Flex>
  </ButtonBase>
);
