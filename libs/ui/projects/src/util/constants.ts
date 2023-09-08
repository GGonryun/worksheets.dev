import { ProjectFeatures } from '@worksheets/schemas-projects';

export const projectFeatureLabels: Record<ProjectFeatures, string> = {
  tasks: 'Tasks',
  services: 'Services',
  vault: 'Vault',
  connections: 'Connections',
  analytics: 'Analytics',
  events: 'Events',
};

export const projectFeatureIcons: Record<ProjectFeatures, string> = {
  tasks: '/icons/features/tasks.svg',
  services: '/icons/features/services.svg',
  vault: '/icons/features/vault.svg',
  connections: '/icons/features/connections.svg',
  analytics: '/icons/features/analytics.svg',
  events: '/icons/features/events.svg',
};
