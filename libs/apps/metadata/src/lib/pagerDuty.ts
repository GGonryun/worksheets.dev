import { ApplicationMetadata } from '../framework';

export const pagerDuty: ApplicationMetadata<'pagerDuty'> = {
  enabled: false,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/pagerduty.svg',
  title: 'Pager Duty',
  subtitle:
    'PagerDuty is a digital operations management platform that empowers the right action, when seconds matter.',
  categories: ['DevOps', 'Security', 'Incident Management'],
  description:
    "PagerDuty's easy to use, self-service developer account makes getting started with integrations simple. Over 12,000 happy customers around the world count on PagerDuty for DevOps, IT Ops, Security, Customer Service, Business Ops, Industrial Ops and IOT, and many other use cases.",
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://developer.pagerduty.com/',
  methods: {
    listServices: {
      title: 'List services',
      description:
        'List existing services. A service is a logical grouping of integrations, escalation policies, and schedules, which is used to group incidents.',
      pricing: 0.001,
      sourceUrl:
        'https://developer.pagerduty.com/api-reference/e960cca205c0f-list-services',
    },
    listIncidents: {
      title: 'List incidents',
      description:
        'List existing incidents. An incident represents a problem or an issue that needs to be addressed and resolved.',
      pricing: 0.001,
      sourceUrl:
        'https://developer.pagerduty.com/api-reference/9d0b4b12e36f9-list-incidents',
    },
    listPriorities: {
      title: 'List priorities',
      description:
        'List existing priorities. A priority is a level of importance assigned to an incident.',
      pricing: 0.001,
      sourceUrl:
        'https://developer.pagerduty.com/api-reference/0fa9ad52bf2d2-list-priorities',
    },
    createIncident: {
      title: 'Create incident',
      description:
        'Create a new incident. An incident represents a problem or an issue that needs to be addressed and resolved.',
      pricing: 0.001,
      sourceUrl:
        'https://developer.pagerduty.com/api-reference/a7d81b0e9200f-create-an-incident',
    },
    updateIncident: {
      title: 'Update incident',
      description:
        'Update an existing incident. An incident represents a problem or an issue that needs to be addressed and resolved.',
      pricing: 0.001,
      sourceUrl:
        'https://developer.pagerduty.com/api-reference/8a0e1aa2ec666-update-an-incident',
    },
  },
};
