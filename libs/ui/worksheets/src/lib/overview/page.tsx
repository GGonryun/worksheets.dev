import { Flex } from '@worksheets/ui-core';
import { useProjectUrls } from '@worksheets/ui-projects';
import { OverviewSection } from './section';
import { FeatureLayout } from '@worksheets/ui/common';

const featureColors = {
  red: '#E99797',
  orange: '#F6B580',
  yellow: '#FFEB85',
  green: '#96BE98',
  blue: '#8CBAE8',
  purple: '#726DA8',
  pink: '#FFADE5',
};

export const OverviewPage = () => {
  const urls = useProjectUrls();
  return (
    <FeatureLayout
      maxWidth={'md'}
      HeaderProps={{
        title: `Project overview`,
        subtitle:
          "Projects are the highest level of organization in Worksheets. They're used to group together related apps and connections. You can also use them to manage access to your apps and connections.",
        src: '/icons/features/projects.svg',
      }}
    >
      <Flex column fullWidth gap={6} pb={6}>
        <OverviewSection
          title="Access third-party services"
          subtitle={`Gain instant access to hundreds of apps through the [Registry](${urls.app.feature.tasks}) or our simplified [Service Layer](${urls.app.feature.services}).`}
          features={[
            {
              color: featureColors.purple,
              title: 'Applications',
              subtitle: 'Building blocks for your business logic.',
              src: '/icons/features/applications.svg',
              href: urls.app.applications,
            },
            {
              beta: true,
              color: featureColors.purple,
              title: 'Services',
              subtitle: 'Unified service layer for common business functions.',
              src: '/icons/features/services.svg',
              href: urls.app.project.tasks,
            },
          ]}
        />
        <OverviewSection
          title="Authorization and authentication"
          subtitle={`Manage secure credentials across apps. Create connections on behalf of users with [Vault](${urls.app.feature.vault}) or on behalf of your app with [Connection](${urls.app.feature.vault}).`}
          features={[
            {
              color: featureColors.red,
              title: 'Connections',
              subtitle: 'Connect all your applications together.',
              src: '/icons/features/connections.svg',
              href: urls.app.project.connections,
            },
            {
              beta: true,
              color: featureColors.red,
              title: 'Vaults',
              subtitle: 'Manage connections on behalf of your users.',
              src: '/icons/features/vault.svg',
              href: urls.app.project.vault,
            },
          ]}
        />
        <OverviewSection
          title="Orchestrate workflows"
          subtitle={`Simplify your application interactions. We provide tools for scaling execution horizontally ([Services](${urls.app.feature.services})) and vertically ([Tasks](${urls.app.feature.tasks})).`}
          features={[
            {
              beta: true,
              color: featureColors.blue,
              title: 'Schemas',
              subtitle: 'Query data across several applications at once.',
              src: '/icons/features/schemas.svg',
              href: urls.app.project.schemas,
            },
            {
              beta: true,
              color: featureColors.blue,
              title: 'Tasks',
              subtitle: 'Orchestrate and execute multi-application workflows.',
              src: '/icons/features/tasks.svg',
              href: urls.app.project.tasks,
            },
          ]}
        />
        <OverviewSection
          title="Supporting tools"
          subtitle={`Iterate faster with our one-shot developer tools. Give your application bidirectional real-time [Events](${urls.app.feature.events}) and instant [code conversion](${urls.app.feature.converter}).`}
          features={[
            {
              beta: true,
              color: featureColors.green,
              title: 'Events',
              subtitle:
                'React to data across applications or on third-party services, instantly.',
              src: '/icons/features/events.svg',
              href: urls.app.project.events,
            },
            {
              beta: true,
              color: featureColors.green,
              title: 'Code Converter',
              subtitle:
                'Translate HTTP requests from one programming language to any other.',
              src: '/icons/features/converter.svg',
              href: urls.app.project.converter,
            },
          ]}
        />
      </Flex>
    </FeatureLayout>
  );
};
