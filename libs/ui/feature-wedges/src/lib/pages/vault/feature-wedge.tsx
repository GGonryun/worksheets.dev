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
import { urls } from '@worksheets/ui/common';
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
const questions: QuestionAnswerPair[] = [
  {
    question: 'How do I get started?',
    answer: `You can get started by creating a free account. We'll walk you through the process of creating your first integration. If you want to learn more, you can check out our [documentation](${urls.docs.home}) or [contact us](${urls.app.contact}).`,
  },
  {
    question: 'Do you provide **Frontend** or **GUI** elements?',
    answer: `No, we integrate with existing no-code and low-code tools which can provide GUI elements for you. Historically, these elements only reduce your flexibility and make it harder to customize your integrations. We recommend using a tool like [Bubble](https://bubble.io) or [Adalo](https://adalo.com) or [Airplane](https://airplanes.dev) to build your GUI.`,
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
