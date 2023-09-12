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
import { AvailableServicesSection } from '../../components/available-services-section';
import { EarlyAccessProgramSection } from '../../components/early-access-program-section';
import { SupportButtonsSection } from '../../components/support-buttons-section';

const resources = [
  {
    title: 'A common interface',
    subtitle:
      'Unifying applications behind a common interface allows you to swap out providers without having to rewrite your code. We support common actions such as sending emails, creating AI models, and more.',
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/openai.svg"
        borderless
        area={32}
      />
    ),
    href: '#',
  },
  {
    title: 'More than just apps',
    subtitle:
      "Sending an email rarely happens in isolation. We've built a workflow engine so you can trigger complex tasks when a service request is received.",
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/segment.svg"
        borderless
        area={32}
      />
    ),
    href: '#',
  },
  {
    title: 'Test driven development',
    subtitle:
      'Treat every environment the same. Easily swap service layers between your development, staging, and production environments. No more building mocks or stubs.',
    icon: (
      <TinyLogo
        src="https://storage.googleapis.com/worksheets-test-app-logos/apps/giphy.svg"
        borderless
        area={32}
      />
    ),
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
      <Divider />
      <EarlyAccessProgramSection />
      <SupportButtonsSection />
    </Flex>
  );
};
