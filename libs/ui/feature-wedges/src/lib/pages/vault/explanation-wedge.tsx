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
        icon={<TinyLogo src="/art/pixels/help.svg" borderless area={32} />}
        title="How do Services work?"
        subtitle="Learn how to start using services in four easy steps."
      />
      <HorizontalSection
        left={
          <ResponsiveImage src={'/placeholders/16x9.png'} alt="placeholder" />
        }
        right={
          <DetailsBox
            title={'Install'}
            subtitle={
              'Create a Worksheets account and install services through our web editor. Users can also install and configure services through our API, but connections must be created through the web editor.'
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
            title={'Connect'}
            subtitle={
              'Connections let you access third-party services. A service can only have one default connection at a time, but you can create as many as you need. We recommend creating a connection for each environment (development, staging, production).'
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
            title={'Configure'}
            subtitle={
              'Customize how your services work with Worksheets using our web editor or APIs. Trigger webhooks, configure default variables, and more. Want extra analytics? We support custom metrics and logging too.'
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
      <HorizontalSection
        flip={isMobile}
        right={
          <ResponsiveImage src={'/placeholders/16x9.png'} alt="placeholder" />
        }
        left={
          <DetailsBox
            title={'Execute'}
            subtitle={'Call our APIs to execute services. It’s that easy!'}
            icon={<TinyLogo borderless src={'/art/trophy.svg'} area={32} />}
            href={'#'}
          />
        }
      />
    </SectionLayout>
  );
};
