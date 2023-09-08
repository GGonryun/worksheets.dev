import { FC } from 'react';
import { HeaderSection } from './header-section';

import { ResponsiveImage, SectionLayout } from './section-layout';
import { BackgroundColors } from '@worksheets/ui/common';

export type VideoSectionProps = {
  src: string;
  title: string;
  subtitle: string;
  backgroundColor?: BackgroundColors;
};
export const VideoSection: FC<VideoSectionProps> = ({
  title,
  subtitle,
  src,
  backgroundColor = 'white',
}) => {
  return (
    <SectionLayout gap={4} py={6} backgroundColor={backgroundColor}>
      <HeaderSection title={title} subtitle={subtitle} />
      {/* TODO: add video here */}
      <ResponsiveImage src="/placeholders/16x9.png" alt="Placeholder" />
    </SectionLayout>
  );
};
