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
  EarlyAccessProgramSection,
  SupportButtonsSection,
  AvailableProgrammingLanguagesSection,
  ExplanationSection,
  ExplanationStepsSection,
  ResourceGridItem,
} from '../../components';
import { UnderConstructionNotice } from '@worksheets/ui/common';

const resources: ResourceGridItem[] = [
  {
    title: 'Chrome extension',
    subtitle:
      'Our Chrome extension makes it easy to get started. Go to any **API documentation** page and our extension will automatically convert any requests and responses we can find.',
    icon: '/art/products/chrome.svg',
    href: '#',
  },
  {
    title: 'Support for all languages',
    subtitle:
      'Using our code converter, you can generate code in any language. Choose which AI model to use to generate code or ask multiple models at the same time. We support **Python**, **Javascript**, **Go**, **Java**, **C#**, and **TypeScript**.',
    icon: '/art/languages/typescript.svg',
    href: '#',
  },
  {
    title: 'Reverse Engineering',
    subtitle:
      "Need to reverse engineer an API? No problem. Our Chrome extension can be used to proxy network requests and responses. We'll automatically generate code samples and **test data** for you.",
    icon: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/firebase.svg',
    href: '#',
  },
];

const questions: QuestionAnswerPair[] = [
  {
    question: 'TODO',
    answer: 'TODO',
  },
  {
    question: 'TODO',
    answer: 'TODO',
  },
  {
    question: 'TODO',
    answer: 'TODO',
  },
  {
    question: 'TODO',
    answer: 'TODO',
  },
  {
    question: 'TODO',
    answer: 'TODO',
  },
];

const sections: ExplanationSection[] = [
  {
    title: 'Enable Applications',
    description: `Use our GUI interface to control which applications you'd like to enable for your users. We'll handle all of the authentication for you.`,
    icon: '/art/pixels/first-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Identify Users',
    description: `Create a key for each user. We recommend using a UUID or a hash of the user's email address. This key will be used to identify the user when they make requests to our API. A user can be assigned as many keys as necessary.`,
    icon: '/art/pixels/second-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
  {
    title: 'Create Connections',
    description: `User's can manage their own connections, or you can manage them for them. When you need to access their data, we'll handle the authentication for you. All you need to do is make a request to our API.`,
    icon: '/art/pixels/third-place.svg',
    image: '/placeholders/16x9.png',
    href: '#',
  },
];

export const ConverterFeatureWedge = () => {
  return (
    <Flex column>
      <TitleSection
        title="Code Converter"
        backgroundColor="success"
        subtitle="Transform any HTTP request into code."
        icon="/icons/features/converter.svg"
        description="Generate code samples in any language from a simple HTTP request. We'll generate code samples in a variety of languages including **Python**, **Javascript**, and **Go**."
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
        title="What is Code Converter?"
        subtitle="Instant code samples in a variety of languages."
      />
      <SectionLayout backgroundColor="white" maxWidth="md" pt={0} pb={12}>
        <ResourceGridSection resources={resources} />
      </SectionLayout>
      <Divider />
      <AvailableProgrammingLanguagesSection backgroundColor="primary" />
      <Divider />
      <SectionLayout backgroundColor="grey" maxWidth="md">
        <UnderConstructionNotice />
      </SectionLayout>
      <Divider />
      <ExplanationStepsSection
        logo="/art/pixels/help.svg"
        title="How do I use Code Convert?"
        subtitle={`Start converting code in just **3 steps**, it's that easy!\n(Don't like it hard? Use our [Chrome extension](#) to make it *even easier*.)`}
        steps={sections}
      />
      <Divider />
      <PricingMarketingSection
        backgroundColor="secondary"
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
        quote={`"TODO"`}
        speaker="TODO"
        title="TODO"
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
