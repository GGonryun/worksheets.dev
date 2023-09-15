import { TinyLogo } from '@worksheets/ui-basic-style';
import { MicroMarkdownText } from '@worksheets/ui-core';
import { useLayout } from '@worksheets/ui/common';
import { FC } from 'react';
import { DetailsBox } from './details-box';
import { HeaderSection } from './header-section';
import { HorizontalSection } from './horizontal-section';
import { SectionLayout, ResponsiveImage } from './section-layout';
import { isOdd } from '@worksheets/util/numbers';

export type ExplanationSection = {
  title: MicroMarkdownText;
  description: MicroMarkdownText;
  icon: string;
  image: string;
  href: string;
};

export const ExplanationStepsSection: FC<{
  title: MicroMarkdownText;
  logo: string;
  subtitle: MicroMarkdownText;
  steps: ExplanationSection[];
}> = ({ title, logo, subtitle, steps }) => {
  const { isMobile } = useLayout();
  return (
    <SectionLayout gap={6} py={6}>
      <HeaderSection
        icon={<TinyLogo src={logo} borderless area={32} />}
        title={title}
        subtitle={subtitle}
      />
      {steps.map((section, index) => (
        <HorizontalSection
          flip={!isMobile && isOdd(index)}
          key={index}
          left={
            <ResponsiveImage
              src={section.image}
              alt={`Artwork for Instruction #${index}`}
            />
          }
          right={
            <DetailsBox
              title={section.title}
              subtitle={section.description}
              icon={<TinyLogo borderless src={section.icon} area={32} />}
              href={section.href}
            />
          }
        />
      ))}
    </SectionLayout>
  );
};
