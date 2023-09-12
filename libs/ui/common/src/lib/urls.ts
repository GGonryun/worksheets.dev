import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const urls = {
  app: {
    home: '/',
    login: '/login',
    applications: '/applications',
    application: (id: string) => `/applications/${id}`,
    contact: '/contact',
    features: '/features',
    earlyAccess: '/early-access',
    feature: {
      overview: '/features',
      vault: '/features/vault',
      schemas: '/features/schemas',
      tasks: '/features/tasks',
      connections: '/features/connections',
      converter: '/features/converter',
      events: '/features/events',
      services: '/features/services',
    },
    projects: '/projects',
    project(id: string) {
      return {
        overview: `/projects/${id}`,
        dashboard: `/projects/${id}/dashboard`,
        vault: `/projects/${id}/vault`,
        schemas: `/projects/${id}/schemas`,
        tasks: `/projects/${id}/tasks`,
        converter: `/projects/${id}/converter`,
        events: `/projects/${id}/events`,
        settings: `/projects/${id}/settings`,
        connections: `/projects/${id}/connections`,
        services: `/projects/${id}/services`,
        service: (serviceId: string) => `/projects/${id}/services/${serviceId}`,
      };
    },
  },
  docs: {
    home: SERVER_SETTINGS.WEBSITES.DOCS_URL(),
    contactUs: SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us'),
  },
};
