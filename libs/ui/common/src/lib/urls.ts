import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const urls = {
  app: {
    home: '/',
    login: '/login',
    applications: '/applications',
    application: (id: string) => `/applications/${id}`,
    contact: '/contact',
    subscribe: '/subscribe',
    unsubscribe: '/subscribe?unsubscribe=',
    features: '/features',
    earlyAccess: '/early-access',
    games: '/games',
    about: '/about',
    privacy: '/privacy',
    terms: '/terms',
    missionStatement: '/mission-statement',
    social: {
      twitter: '/social/twitter',
      facebook: '/social/facebook',
      github: '/social/github',
      discord: '/social/discord',
      linkedin: '/social/linkedin',
      instagram: '/social/instagram',
    },
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
    blog: SERVER_SETTINGS.WEBSITES.DOCS_URL('/blog'),
  },
  games: {
    emojiWar: SERVER_SETTINGS.WEBSITES.EMOJI_WAR_URL(),
    puzzleWords: SERVER_SETTINGS.WEBSITES.PUZZLE_WORDS_URL(),
  },
  external: {
    waterOrg: 'https://water.org',
    charityWater: 'https://charitywater.org',
    homeFirst: 'https://homefirst.org',
  },
};