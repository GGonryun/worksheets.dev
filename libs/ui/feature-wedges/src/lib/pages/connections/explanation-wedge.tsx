import { TinyLogo } from '@worksheets/ui-basic-style';
import { useLayout } from '@worksheets/ui/common';
import {
  SectionLayout,
  HeaderSection,
  HorizontalSection,
  ResponsiveImage,
  DetailsBox,
} from '../../components';

export const ExplanationWedge = () => {
  const { isMobile } = useLayout();
  return (
    <SectionLayout gap={8} py={8}>
      <HeaderSection
        icon={
          <TinyLogo src="/art/pixels/support-call.svg" borderless area={32} />
        }
        title="How does it work?"
        subtitle="Quickly connect your apps and automate your workflows."
      />
      <HorizontalSection
        left={
          <ResponsiveImage src={'/placeholders/16x9.png'} alt="placeholder" />
        }
        right={
          <DetailsBox
            title={'Create'}
            subtitle={
              'Use our visual editor to create connections between your applications. We support over 100+ applications and are adding more every day.'
            }
            icon={
              <TinyLogo
                borderless
                src={'/art/pixels/first-place.svg'}
                area={32}
              />
            }
            href={'#'}
          />
        }
      />
      <HorizontalSection
        flip={isMobile}
        right={
          <ResponsiveImage src={'/placeholders/16x9.png'} alt="placeholder" />
        }
        left={
          <DetailsBox
            title={'Access'}
            subtitle={
              "Access connections in your applications with our Connections API. We also provide SDK's for popular languages like **Javascript** and **Python**. Use our API to build workflows or share resources across your organization."
            }
            icon={
              <TinyLogo
                borderless
                src={'/art/pixels/second-place.svg'}
                area={32}
              />
            }
            href={'#'}
          />
        }
      />
      <HorizontalSection
        left={
          <ResponsiveImage src={'/placeholders/16x9.png'} alt="placeholder" />
        }
        right={
          <DetailsBox
            title={'Share'}
            subtitle={
              "Use connections across your organization. Share connections with your team or the entire organization. We'll keep your connections up to date and notify you of any changes. Connections are versioned and can be rolled back at any time."
            }
            icon={
              <TinyLogo
                borderless
                src={'/art/pixels/third-place.svg'}
                area={32}
              />
            }
            href={'#'}
          />
        }
      />
    </SectionLayout>
  );
};
