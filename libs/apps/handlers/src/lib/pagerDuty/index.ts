import { TRPCError } from '@trpc/server';
import { ApplicationExecutors } from '../framework';
import { parseIncidents, parseServices } from './util';

const baseUrl = `https://api.pagerduty.com`;

const basicHeaders = (token: string) => {
  return {
    Accept: 'application/vnd.pagerduty+json;version=2',
    'Content-Type': 'application/json',
    Authorization: `Token token=${token}`,
  };
};

export const pagerDuty: ApplicationExecutors<'pagerDuty'> = {
  async listPriorities({ context, input }) {
    const url = new URL(`${baseUrl}/priorities`);

    if (input?.limit) {
      url.searchParams.append('limit', input.limit.toString());
    }

    if (input?.offset) {
      url.searchParams.append('offset', input.offset.toString());
    }

    if (input?.total != null) {
      url.searchParams.append('total', input.total.toString());
    }

    const result = await fetch(url.toString(), {
      method: 'GET',
      headers: basicHeaders(context.token),
    });

    if (!result.ok) {
      const text = await result.text();
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to list priorities',
        cause: new Error(text),
      });
    }

    const json = await result.json();
    return {
      priorities: json.priorities ?? [],
      offset: json.offset ?? undefined,
      limit: json.limit ?? undefined,
      more: json.more ?? undefined,
      total: json.total ?? undefined,
    };
  },

  async listServices({ context, input }) {
    const url = new URL(`${baseUrl}/services`);

    if (input?.limit) {
      url.searchParams.append('limit', input.limit.toString());
    }

    if (input?.offset) {
      url.searchParams.append('offset', input.offset.toString());
    }

    if (input?.query) {
      url.searchParams.append('query', input.query.toString());
    }

    if (input?.total != null) {
      url.searchParams.append('total', input.total.toString());
    }
    const result = await fetch(url.toString(), {
      method: 'GET',
      headers: basicHeaders(context.token),
    });

    if (!result.ok) {
      const text = await result.text();
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to list services',
        cause: new Error(text),
      });
    }

    const json = await result.json();
    return {
      more: json.more ?? undefined,
      total: json.total ?? undefined,
      offset: json.offset ?? undefined,
      limit: json.limit ?? undefined,
      services: parseServices(json.services),
    };
  },

  async listIncidents({ context, input }) {
    const url = new URL(`${baseUrl}/incidents`);

    if (input?.limit) {
      url.searchParams.append('limit', input.limit.toString());
    }

    const result = await fetch(url.toString(), {
      method: 'GET',
      headers: basicHeaders(context.token),
    });

    if (!result.ok) {
      const text = await result.text();
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to list incidents',
        cause: new Error(text),
      });
    }

    const json = await result.json();
    return {
      more: json.more ?? undefined,
      total: json.total ?? undefined,
      offset: json.offset ?? undefined,
      limit: json.limit ?? undefined,
      incidents: parseIncidents(json.incidents),
    };
  },

  async createIncident({ context, input }) {
    const url = new URL(`${baseUrl}/incidents`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {
      incident: {
        type: 'incident',
        title: input.title,
        service: {
          id: input.serviceId,
          type: 'service_reference',
        },
        urgency: input.urgency ?? 'high',
        incident_key: input.incidentKey ?? undefined,
      },
    };

    if (input.priorityId) {
      body['incident']['priority'] = {
        id: input.priorityId,
        type: 'priority_reference',
      };
    }

    if (input.body) {
      body['incident']['body'] = {
        type: 'incident_body',
        details: input.body,
      };
    }

    const result = await fetch(url.toString(), {
      method: 'POST',
      headers: basicHeaders(context.token),
      body: JSON.stringify(body),
    });

    if (!result.ok) {
      const text = await result.text();
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to list incidents',
        cause: new Error(text),
      });
    }

    const json = await result.json();

    return {
      incidentId: json.incident.id,
    };
  },

  async updateIncident({ context, input }) {
    const url = new URL(`${baseUrl}/incidents/${input.id}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {
      incident: {
        type: 'incident',
        status: input.status,
        resolution: input.resolution ?? undefined,
        urgency: input.urgency ?? undefined,
      },
    };

    const result = await fetch(url.toString(), {
      method: 'PUT',
      headers: basicHeaders(context.token),
      body: JSON.stringify(body),
    });

    if (!result.ok) {
      const text = await result.text();
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to list incidents',
        cause: new Error(text),
      });
    }

    const json = await result.json();

    return {
      incidentId: json.incident.id,
    };
  },
};
