import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import {
  incidentSchema,
  incidentUrgencySchema,
  prioritySchema,
  serviceSchema,
} from './type';

export const listPriorities = newMethod({
  appId: 'pagerDuty',
  methodId: 'listPriorities',
  label: 'List priorities',
  description:
    'List existing priorities. A priority is a level of importance assigned to an incident.',
  input: z
    .object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      total: z.boolean().optional(),
    })
    .optional(),
  output: z.object({
    priorities: z.array(prioritySchema),
    limit: z.number().optional(),
    offset: z.number().optional(),
    more: z.boolean(),
    total: z.number().optional(),
  }),
});

export const listServices = newMethod({
  appId: 'pagerDuty',
  methodId: 'listServices',
  label: 'List services',
  description:
    'List existing services. A service is a logical grouping of integrations, escalation policies, and schedules, which is used to group incidents.',
  input: z
    .object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      query: z.string().optional(),
      total: z.boolean().optional(),
    })
    .optional(),
  output: z.object({
    limit: z.number().optional(),
    offset: z.number().optional(),
    more: z.boolean(),
    total: z.number().optional(),
    services: z.array(serviceSchema),
  }),
});

export const listIncidents = newMethod({
  appId: 'pagerDuty',
  methodId: 'listIncidents',
  label: 'List incidents',
  description:
    'List existing incidents. An incident represents a problem or an issue that needs to be addressed and resolved.',
  input: z
    .object({
      limit: z.number().optional(),
    })
    .optional(),
  output: z.object({
    incidents: z.array(incidentSchema),
    offset: z.number().optional(),
    limit: z.number().optional(),
    more: z.boolean(),
    total: z.number().optional(),
  }),
});

export const createIncident = newMethod({
  appId: 'pagerDuty',
  methodId: 'createIncident',
  label: 'Create incident',
  description:
    'Create a new incident. An incident represents a problem or an issue that needs to be addressed and resolved.',
  input: z.object({
    title: z.string(),
    serviceId: z.string(),
    priorityId: z.string().optional(),
    urgency: incidentUrgencySchema.optional(),
    incidentKey: z.string().optional(),
    body: z.string().optional(),
  }),
  output: z.object({
    incidentId: z.string(),
  }),
});

export const updateIncident = newMethod({
  appId: 'pagerDuty',
  methodId: 'updateIncident',
  label: 'Update incident',
  description:
    'Update an existing incident. An incident represents a problem or an issue that needs to be addressed and resolved.',
  input: z.object({
    id: z.string(),
    status: z.enum(['acknowledged', 'resolved']),
    resolution: z.string().optional(),
    urgency: incidentUrgencySchema.optional(),
  }),
  output: z.object({
    incidentId: z.string(),
  }),
});

export const pagerDuty = newApp({
  appId: 'pagerDuty',
  description:
    'PagerDuty is a digital operations management platform that empowers the right action, when seconds matter.',
  label: 'PagerDuty',
  context: z.object({
    token: z.string(),
  }),
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/pagerduty.svg',
  methods: {
    listServices,
    listIncidents,
    listPriorities,
    createIncident,
    updateIncident,
  },
});
