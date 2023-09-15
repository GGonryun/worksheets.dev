import { Divider } from '@mui/material';
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
  ExplanationStepsSection,
  ExplanationSection,
  EarlyAccessProgramSection,
  SupportButtonsSection,
} from '../../components';

const resources = [
  {
    title: 'Application registry',
    subtitle:
      'All your documentation in one place. Use our intuitive API and gain access to hundreds of applications all with one simple API. We support a variety of authentication modes to ensure your data is secure.',
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/gmail.svg',
    href: '#',
  },
  {
    title: 'Rapid prototyping',
    subtitle:
      'Stop managing enviornment variables. We make it easy to prototype applications that connect to third-party services. No more scrolling and searching through documentation.',
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/discord.svg',
    href: '#',
  },
  {
    title: 'Unlimited environments',
    subtitle:
      "Stop mocking API requests and test real interactions with third party services securely. Easily swap between your production, staging, and test environments with a single click. We'll handle all of the authentication for you.",
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/notion.svg',
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

const steps: ExplanationSection[] = [
  {
    title: 'Create',
    description:
      'Use our visual editor to create connections between your applications. We currently support 10+ applications and are adding more every day.',
    icon: '/art/pixels/first-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Access',
    description:
      "Access connections in your applications with our Connections API. We also provide SDK's for popular languages like **Javascript** and **Python**. Use our API to build workflows or share resources across your organization.",
    icon: '/art/pixels/second-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Share',
    description:
      "Use connections across your organization. Share connections with your team or the entire organization. We'll keep your connections up to date and notify you of any changes. Connections are versioned and can be rolled back at any time.",
    icon: '/art/pixels/third-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
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
        title="What are Connections?"
        subtitle="Learn about how our **Application Registry** can help you save time."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={resources} />
      </SectionLayout>
      <Divider />
      <AvailableApplicationsSection backgroundColor="secondary" />
      <Divider />
      <ExplanationStepsSection
        title={'How do I use Connections?'}
        logo={'/art/pixels/support-call.svg'}
        subtitle={'Quickly connect your apps and automate your workflows.'}
        steps={steps}
      />
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
        avatar=""
        backgroundColor="primary"
        icon="/symbols/blue/bolt.svg"
      />
      <Divider />
      <EarlyAccessProgramSection />
      <SupportButtonsSection />
    </Flex>
  );
};
