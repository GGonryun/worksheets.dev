import { Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { urls } from '@worksheets/ui/common';
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
  AvailableConnectorsSection,
  EarlyAccessProgramSection,
  SupportButtonsSection,
  ExplanationStepsSection,
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

const questions: QuestionAnswerPair[] = [
  {
    question: 'How do I get started?',
    answer: `You can get started by creating a free account. We'll walk you through the process of creating your first integration. If you want to learn more, you can check out our [documentation](${urls.docs.home}) or [contact us](${urls.app.contact}).`,
  },
  {
    question: 'Do you provide **Frontend** or **GUI** elements?',
    answer: `No, we integrate with existing no-code and low-code tools which can provide GUI elements for you. Pre-built GUI elements only reduce your flexibility and make it harder to customize your integrations. We recommend using a tool like [Bubble](https://bubble.io) or [Adalo](https://adalo.com) or [Airplane](https://airplanes.dev) to build your GUI.`,
  },
  {
    question:
      "What's the difference between a **connection** and a **connector**?",
    answer: `A **connection** is a link between your application and a third-party application. A **connector** is a piece of software that allows you to connect to a third-party application. For example, we have a **connector** for Gmail that allows you to create a **connection** between your application and Gmail. **Connectors** are reusable, so you can create as many **connections** as you need.`,
  },
  {
    question: "How do user's manage their connections?",
    answer: `We provide an API to help you create tools to manage your user's connections. You can use this API to create, update, and delete connections. You can also use this API to retrieve information about your user's connections.`,
  },
];

const steps: ExplanationSection[] = [
  {
    title: 'Enable Applications',
    description:
      "Use our GUI interface to control which applications you'd like to enable for your users. We'll handle all of the authentication for you.",
    icon: '/art/pixels/first-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Identify Users',
    description:
      "Create and assign keys from the vault to each user. A user can be assigned multiple keys. We recommend using a UUID or a hash of the user's email address. This key will be used to identify the user when they make requests to our API.",
    icon: '/art/pixels/second-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Create Connections',
    description:
      'Access data from a third-party application using connections. Users can manage their own connections, or you can manage connections yourself. These connections are assigned to a key for easy access.',
    icon: '/art/pixels/third-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Execute Applications',
    description:
      "Execute applications from the registry with the user's key and we'll take care of the rest. *It's that simple*.",
    icon: '/art/trophy.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
];

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
        title="What are Vaults and Keys?"
        subtitle="See how teams integrate Vault into their applications."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={resources} />
      </SectionLayout>
      <Divider />
      <AvailableConnectorsSection backgroundColor="error" />
      <Divider />
      <ExplanationStepsSection
        title={'How does Vault work?'}
        subtitle="Learn how to start using our connector **vault** in four easy steps."
        logo={'/art/pixels/help.svg'}
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
        quote={`"The connector vault is a critical piece of our infrastructure.\nWe even use it to manage all of **your credentials** on Worksheets."`}
        speaker="Miguel Campos"
        title="Founder of [Worksheets.dev](https://worksheets.dev)"
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
