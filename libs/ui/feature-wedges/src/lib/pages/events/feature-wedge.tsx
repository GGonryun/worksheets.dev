import { Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import {
  TitleSection,
  VideoSection,
  SectionLayout,
  ResourceGridSection,
  PricingMarketingSection,
  FrequentlyAskedQuestionsMarketingSection,
  QuoteSection,
  QuestionAnswerPair,
  ExplanationSection,
  ExplanationStepsSection,
  AvailableConnectorsSection,
  EarlyAccessProgramSection,
  SupportButtonsSection,
} from '../../components';

const resources = [
  {
    title: 'OAuth2.0 and more',
    subtitle:
      'We support a variety of authentication modes including OAuth 2.0, and API keys. We protect all of your credentials with industry standard encryption.',
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/gmail.svg',
    href: '#',
  },
  {
    title: 'Analytics and insights',
    subtitle:
      "Understand how your users are using your integrations. We'll provide you with analytics and insights so you can make informed decisions about your integrations.",
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/github.svg',
    href: '#',
  },
  {
    title: 'Abstracted connections',
    subtitle:
      "Let your user's manage their own connections. When you need to access their data, we'll handle the authentication for you. All you need to do is make a request to our API.",
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/slack.svg',
    href: '#',
  },
];
const questions: QuestionAnswerPair[] = [];

const steps: ExplanationSection[] = [];

export const EventsFeatureWedge = () => {
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
      <AvailableConnectorsSection backgroundColor="error" />
      <Divider />
      <ExplanationStepsSection
        title={'How do I use Connections?'}
        logo={'/art/pixels/support-call.svg'}
        subtitle={'Quickly connect your apps and automate your workflows.'}
        steps={steps}
      />
      <Divider />
      <PricingMarketingSection
        backgroundColor="error"
        title="Ready to get started?"
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
        quote={`"The connector vault is a critical piece of our own infrastructure. We use it to manage all of our user's credentials and access tokens. It's a huge time saver."`}
        speaker="Miguel Campos"
        title="Founder of Worksheets.Dev"
        avatar=""
        backgroundColor="warning"
        icon="/symbols/white/pyramid.svg"
      />
      <Divider />
      <EarlyAccessProgramSection />
      <SupportButtonsSection />
    </Flex>
  );
};
