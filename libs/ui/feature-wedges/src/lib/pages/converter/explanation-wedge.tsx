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
        title="How does Vault work?"
        subtitle="Learn how to start using our connector **vault** in four easy steps."
      />
      <HorizontalSection
        left={
          <ResponsiveImage src={'/placeholders/16x9.png'} alt="placeholder" />
        }
        right={
          <DetailsBox
            title={'Enable Applications'}
            subtitle={
              "Use our GUI interface to control which applications you'd like to enable for your users. We'll handle all of the authentication for you."
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
            title={'Identify Users'}
            subtitle={
              "Create a key for each user. We recommend using a UUID or a hash of the user's email address. This key will be used to identify the user when they make requests to our API. A user can be assigned as many keys as necessary."
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
            title={'Create Connections'}
            subtitle={
              "User's can manage their own connections, or you can manage them for them. When you need to access their data, we'll handle the authentication for you. All you need to do is make a request to our API."
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
            subtitle={
              "Call our API using a specific **user key** and we'll take care of the rest. It's that easy!"
            }
            icon={<TinyLogo borderless src={'/art/trophy.svg'} area={32} />}
            href={'#'}
          />
        }
      />
    </SectionLayout>
  );
};
