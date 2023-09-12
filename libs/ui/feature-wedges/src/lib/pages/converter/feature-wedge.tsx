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
  QuestionAnswerPair,
} from '../../components';
import { AvailableConnectorsSection } from '../../components/available-connectors-section';
import { EarlyAccessProgramSection } from '../../components/early-access-program-section';
import { SupportButtonsSection } from '../../components/support-buttons-section';

const resources = [
  {
    title: 'OAuth2.0 and more',
    subtitle:
      'We support a variety of authentication modes including OAuth 2.0, and API keys. We protect all of your credentials with industry standard encryption.',
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
    title: 'Analytics and insights',
    subtitle:
      "Understand how your users are using your integrations. We'll provide you with analytics and insights so you can make informed decisions about your integrations.",
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
    title: 'Abstracted connections',
    subtitle:
      "Let your user's manage their own connections. When you need to access their data, we'll handle the authentication for you. All you need to do is make a request to our API.",
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
const questions: QuestionAnswerPair[] = [];

export const ConverterFeatureWedge = () => {
  return (
    <Flex column>
      <TitleSection
        title="Code Converter"
        backgroundColor="success"
        subtitle="Transform your HTTP Requests"
        icon="/icons/features/vault.svg"
        description="Instantly generate code samples in any language from an HTTP request. We'll generate code samples in a variety of languages including **Python**, **Javascript**, and **Go**."
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
        title="How do I use Code Converter?"
        subtitle="Instantly provide code samples to your users in a variety of languages."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={resources} />
      </SectionLayout>
      <Divider />
      <AvailableConnectorsSection backgroundColor="error" />
      <Divider />
      <ExplanationWedge />
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
        avatar="/people/miguel-campos.jpg"
        backgroundColor="warning"
        icon="/symbols/white/pyramid.svg"
      />
      <Divider />
      <EarlyAccessProgramSection />
      <SupportButtonsSection />
    </Flex>
  );
};
