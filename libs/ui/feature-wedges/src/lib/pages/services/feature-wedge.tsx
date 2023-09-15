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
  ExplanationSection,
  ExplanationStepsSection,
  AvailableServicesSection,
  EarlyAccessProgramSection,
  SupportButtonsSection,
} from '../../components';

const resources = [
  {
    title: 'A common interface',
    subtitle:
      'Unifying applications behind a common interface allows you to swap out providers without having to rewrite your code. We support common actions such as sending emails, creating AI models, and more.',
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/openai.svg',
    href: '#',
  },
  {
    title: 'More than just apps',
    subtitle:
      "Sending an email rarely happens in isolation. We've built a workflow engine so you can trigger complex tasks when a service request is received.",
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/segment.svg',
    href: '#',
  },
  {
    title: 'Test driven development',
    subtitle:
      'Treat every environment the same. Easily swap service layers between your development, staging, and production environments. No more building mocks or stubs.',
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/giphy.svg',
    href: '#',
  },
];

const questions = [
  {
    question: 'What is a Service?',
    answer:
      'A service is a common action that you can perform across applications. For example, sending an email is a service that you can perform with **Gmail**, **Sendgrid**, and **Mailchimp**.',
  },
  {
    question: "What's the difference between a connection and a service?",
    answer:
      'Services need connections to work. For example, you need a connection to **Gmail** to send an email. We support a variety of authentication methods to ensure your data is secure.',
  },
  {
    question: 'Can I use my own API?',
    answer:
      'If you would like to use your own API, you can use our **Custom API** service. This allows you to connect to any API with a simple HTTP request. Alternatively, you can use our **Webhook** service to receive data from your own API.',
  },
  {
    question: 'What authentication modes do you support?',
    answer:
      'We support a variety of authentication modes including OAuth 2.0, API keys, and more. We also support custom authentication modes such as **Custom OAuth 2.0** and **Custom API**.',
  },
  {
    question: "What if I don't see the service I need?",
    answer:
      'We are constantly adding new services to our platform. If you would like to request a new service, please contact us.',
  },
];

const steps: ExplanationSection[] = [
  {
    title: 'Install',
    description:
      'Create a Worksheets account and install services through our web editor. Users can also install and configure services through our API, but connections must be created through the web editor.',
    icon: '/art/pixels/first-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Connect',
    description:
      'Connections let you access third-party services. A service can only have one default connection at a time, but you can create as many as you need. We recommend creating a connection for each environment (development, staging, production).',
    icon: '/art/pixels/second-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Configure',
    description:
      'Customize how your services work with Worksheets using our web editor or APIs. Trigger webhooks, configure default variables, and more. Want extra analytics? We support custom metrics and logging too.',
    icon: '/art/pixels/third-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Execute',
    description:
      "Once you've installed, connected, and configured your services, you can start using them in your applications. Call services directly from your code or use our workflow engine to trigger complex tasks.",
    icon: '/art/trophy.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
];

export const ServicesFeatureWedge = () => {
  return (
    <Flex column>
      <TitleSection
        title="Services"
        backgroundColor="secondary"
        subtitle="Standardize business logic across applications"
        icon="/icons/features/services.svg"
        description="Swap out provider applications without having to rewrite your workflows. Sending an email with **Gmail** is the same as sending an email with **Sendgrid**."
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
        title="What are Services?"
        subtitle="See how engineers use our Service Layer to build applications faster."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={resources} />
      </SectionLayout>
      <Divider />
      <AvailableServicesSection backgroundColor="success" />
      <Divider />
      <ExplanationStepsSection
        title={'How do Services work?'}
        subtitle={'Learn how to start using services in *four easy steps*.'}
        logo={'/art/pixels/help.svg'}
        steps={steps}
      />
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
