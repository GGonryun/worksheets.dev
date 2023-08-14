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

export default newApp({
  appId: 'pagerDuty',
  context: z.object({
    token: z.string(),
  }),
  methods: {
    listServices,
    listIncidents,
    listPriorities,
    createIncident,
    updateIncident,
  },
});
