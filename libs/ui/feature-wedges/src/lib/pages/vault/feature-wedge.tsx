import { Divider } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { ExplanationWedge } from './explanation-wedge';
import { Flex } from '@worksheets/ui-core';
import {
  TitleSection,
  VideoSection,
  SectionLayout,
  ResourceGridSection,
  PricingMarketingSection,
  FrequentlyAskedQuestionsMarketingSection,
  QuoteSection,
} from '../../components';

const resources = [
  {
    title: 'Safe and secure',
    subtitle:
      'Learn how to manage user credentials and access tokens with our secure Vault. We support a variety of authentication modes including OAuth 2.0, API keys, and more. We protect all of your credentials with industry standard encryption.',
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/gmail.svg"
        borderless
        area={32}
      />
    ),
    href: '#',
  },
  {
    title: 'Manage user access',
    subtitle:
      "Managing connections to third-party services can be a pain. We've built a simple interface for accessing third-party services on behalf of your users.",
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/github.svg"
        borderless
        area={32}
      />
    ),
    href: '#',
  },
  {
    title: 'Custom authentication',
    subtitle: '',
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/slack.svg"
        borderless
        area={32}
      />
    ),
    href: '#',
  },
];
const questions = [];

export const VaultFeatureWedge = () => {
  return (
    <Flex column>
      <TitleSection
        title="Vault"
        backgroundColor="warning"
        subtitle="Secure credential management"
        icon="/icons/features/vault.svg"
        description="Manage user credentials and access tokens with our secure Vault. We support a variety of authentication modes including OAuth 2.0, API keys, and more."
        buttons={{
          primary: {
            label: 'Request access',
            href: '#',
          },
        }}
      />
      <Divider />
      <VideoSection
        src={'TODO'}
        title="How do I use Vault?"
        subtitle="See how teams integrate Vault into their applications."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={resources} />
      </SectionLayout>
      <Divider />
      <SectionLayout backgroundColor="success">
        TODO: "What services do you support?" similar to connections but shows a
        list of our supported services for the service layer.
      </SectionLayout>
      <Divider />
      <ExplanationWedge />
      <Divider />
      <PricingMarketingSection
        backgroundColor="error"
        title="Need more juice?"
      />
      <Divider />
      <FrequentlyAskedQuestionsMarketingSection
        questions={questions}
        title={'Any more questions?'}
        subtitle={
          "We've compiled a list of our most frequently asked questions. If you have a question that isn't answered here, please contact us."
        }
        icon="/symbols/solid/red-cube.svg"
      />
      <Divider />
      <QuoteSection
        quote={`"Having a service layer lets me quickly prototype new ideas before launching them to production. Now I can focus on building my business instead of building integrations."`}
        speaker="Ricardo Alcaraz-Ramirez"
        title="CEO of NelaFlowers.io"
        avatar="/people/ricardo-alcaraz.jpg"
        backgroundColor="warning"
        icon="/symbols/white/pyramid.svg"
      />
    </Flex>
  );
};
