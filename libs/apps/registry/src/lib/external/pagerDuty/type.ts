import { z } from '@worksheets/zod';

export const incidentUrgencySchema = z.enum(['high', 'low']);

/*
{
  "id": "PSLWBL8",
  "type": "priority",
  "summary": "P1",
  "self": "https://api.pagerduty.com/priorities/PSLWBL8",
  "name": "P1",
  "description": "Critical issue that warrants public notification and liaison with executive teams"
},
*/
export const prioritySchema = z
  .object({
    id: z.string(),
    type: z.string(),
    summary: z.string().optional(),
    self: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .nonstrict();

export const serviceSchema = z.object({
  id: z.string(),
  type: z.string(),
  summary: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.string().optional(),
  status: z
    .enum(['active', 'warning', 'critical', 'maintenance', 'disabled'])
    .optional(),
});

/*
{
  "id": "PT4KHLK",
  "summary": "[#1234] The server is on fire.",
  "htmlUrl": "https://subdomain.pagerduty.com/incidents/PT4KHLK",
  "incidentNumber": 1234,
  "createdAt": "2015-10-06T21:30:42Z",
  "updatedAt": "2015-10-06T21:40:23Z",
  "resolvedAt": "2015-10-06T21:38:23Z",
  "status": "resolved",
  "title": "The server is on fire.",
  "incidentKey": "baf7cf21b1da41b4b0221008339ff357",
  "urgency": "high",
  "service": {
    "id": "PIJ90N7",
    "type": "service_reference",
    "summary": "My Mail Service",
    "self": "https://api.pagerduty.com/services/PIJ90N7",
    "html_url": "https://subdomain.pagerduty.com/services/PIJ90N7"
  }
}
*/
export const incidentSchema = z.object({
  id: z.string(),
  type: z.string(),
  summary: z.string().optional(),
  incidentNumber: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  resolvedAt: z.string().optional(),
  status: z.enum(['triggered', 'acknowledged', 'resolved']).optional(),
  title: z.string().optional(),
  incidentKey: z.string().optional(),
  urgency: z.enum(['high', 'low']).optional(),
  service: serviceSchema.optional(),
  priority: prioritySchema.optional(),
});
