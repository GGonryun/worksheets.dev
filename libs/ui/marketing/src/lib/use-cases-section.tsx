import { MarketingSection } from './marketing-section';
import { TinyLogo } from '@worksheets/ui-basic-style';

export const UseCasesSection = () => {
  return (
    <MarketingSection
      title="Browse solutions to common problems"
      description="Use our products together to help you solve complex business problems. We provide a variety of use cases and corresponding samples to help you get started."
      action={{
        text: 'View all use cases',
        href: '/use-cases',
      }}
    >
      <TinyLogo
        src="/art/supportive-business-people.svg"
        borderless
        area={280}
      />
    </MarketingSection>
  );
};
