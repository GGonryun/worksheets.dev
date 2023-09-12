import { Divider } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { ExplanationWedge } from './explanation-wedge';
import { Flex } from '@worksheets/ui-core';
import {
  TitleSection,
  VideoSection,
  SectionLayout,
  ResourceGridSection,
  AvailableApplicationsSection,
  PricingMarketingSection,
  FrequentlyAskedQuestionsMarketingSection,
  QuoteSection,
} from '../../components';
import { EarlyAccessProgramSection } from '../../components/early-access-program-section';
import { SupportButtonsSection } from '../../components/support-buttons-section';

const connectionResources = [
  {
    title: 'Application registry',
    subtitle:
      'All your documentation in one place. Use our intuitive API and gain access to hundreds of applications all with one simple API. We support a variety of authentication modes to ensure your data is secure.',
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
    title: 'Rapid prototyping',
    subtitle:
      'Stop managing enviornment variables. We make it easy to prototype applications that connect to third-party services. No more scrolling and searching through documentation.',
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/discord.svg"
        borderless
        area={32}
      />
    ),
    href: '#',
  },
  {
    title: 'Unlimited environments',
    subtitle:
      "Stop mocking API requests and test real interactions with third party services securely. Easily swap between your production, staging, and test environments with a single click. We'll handle all of the authentication for you.",
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/notion.svg"
        borderless
        area={32}
      />
    ),
    href: '#',
  },
];
const questions = [
  {
    question: 'What is a connection?',
    answer:
      'A connection is a way to connect to an application. We support a variety of authentication methods to ensure your data is secure.',
  },
  {
    question: "What's the difference between a connection and a workflow?",
    answer:
      'A connection is a way to connect to an application. A workflow is a series of steps that you can use to automate a task.',
  },
  {
    question: 'What authentication modes do you support?',
    answer:
      'Right now we support OAuth 2.0, API Keys, and Basic Authentication. We are working on adding more authentication modes.',
  },
];

export const ConnectionsFeatureWedge = () => {
  return (
    <Flex column>
      <TitleSection
        title="Connection"
        subtitle="Access data from any application"
        icon="/icons/features/connections.svg"
        description="Our application registry helps you gain instant access to third-party services with one simple API. Use applications to build workflows or share resources across your organization."
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
        title="What are Applications and Connections?"
        subtitle="Get a quick overview of how our Application Registry can help you save time."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={connectionResources} />
      </SectionLayout>
      <Divider />
      <AvailableApplicationsSection backgroundColor="secondary" />
      <Divider />
      <ExplanationWedge />
      <Divider />
      <PricingMarketingSection />
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
        quote={`"I've been using Connections for a few months now and it's been a game changer. I build my workflows in TypeScript and I can share them with my team on Github."`}
        speaker="Anthony Diaz"
        title="CEO of DiscGolfScoreCard.app"
        avatar="/people/anthony-diaz.jpg"
        backgroundColor="primary"
        icon="/symbols/blue/bolt.svg"
      />
      <Divider />
      <EarlyAccessProgramSection />
      <SupportButtonsSection />
    </Flex>
  );
};
