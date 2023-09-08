import { Divider } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { ExplanationWedge } from './explanation-wedge';
import { Flex } from '@worksheets/ui-core';
import {
  TitleSection,
  VideoSection,
  SectionLayout,
  ResourceGridSection,
  ApplicationsSection,
  PricingMarketingSection,
  FrequentlyAskedQuestionsMarketingSection,
  QuoteSection,
} from '../../components';

const connectionResources = [
  {
    title: 'Programmatic OAuth 2.0',
    subtitle:
      'Learn how to connect an app to **Gmail** in less than 2 minutes. This video teaches you how to access connections in your apps with our API.',
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
      "Create a custom discord webhook endpoint in less than 15 minutes. In this video we'll be triaging issues from Github and sending them to Discord.",
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
    title: 'Share connections',
    subtitle:
      "This tutorial creates a connection to **Notion** and shares it with your team. We'll be using the Notion API to create a new page in your workspace.",
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
        title="Connections"
        subtitle="Access data from any application"
        icon="/icons/features/connections.svg"
        description="Connections bridge the gap between your application and third-party services. Use connections to build workflows or share resources across your organization."
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
        title="What are Connections?"
        subtitle="Get a quick overview of how Connections can help you save time."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={connectionResources} />
      </SectionLayout>
      <Divider />
      <ApplicationsSection />
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
    </Flex>
  );
};
