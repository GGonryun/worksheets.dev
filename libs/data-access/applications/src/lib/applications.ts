import {
  ApplicationDetails,
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';
import { ApplicationRegistry, registry } from '@worksheets/apps-registry';
import { convertZodSchemaToJsonSchema } from '@worksheets/util-json';
import { AnyApplication, AnyMethod } from '@worksheets/apps-core';
import { createCurlExample, createTypeScriptExample } from './examples';
import { metadata } from '@worksheets/apps-metadata';
import { TRPCError } from '@trpc/server';

export interface ApplicationsDatabase {
  getApp(id: string): ApplicationDetails;
  list(): ListApplicationsResponse;
  listApplicationMethodDetails(
    id: string
  ): ListApplicationMethodDetailsResponse;
  getApplicationDetails(appId: string): GetApplicationDetailsResponse;
}

export const newApplicationsDatabase = (): ApplicationsDatabase => {
  return {
    getApp: (id: string) => {
      const key = id as keyof ApplicationRegistry;
      const app = registry[key];
      return convertApplicationDefinition(key, app);
    },
    list: () => {
      return Object.keys(registry).map((id) => {
        const key = id as keyof ApplicationRegistry;
        const app = registry[key];
        return convertApplicationDefinition(key, app);
      });
    },
    getApplicationDetails: (appId: string): GetApplicationDetailsResponse => {
      const key = appId as keyof ApplicationRegistry;
      const app = registry[key];

      const { tutorialUrl, overview, creator, lastUpdated } = metadata[key];

      return {
        appId: key,
        label: app.label ?? key,
        description: app.description ?? '',
        logo: app.logo ?? '',
        creator: creator,
        overview: overview,
        lastUpdated: lastUpdated,
        tutorial: tutorialUrl,
      };
    },
    listApplicationMethodDetails: (
      appId: string
    ): ListApplicationMethodDetailsResponse => {
      const key = appId as keyof ApplicationRegistry;
      const app = registry[key] as AnyApplication;
      const methods = app.methods;
      if (!methods) {
        return [];
      }

      return Object.keys(methods).map((methodId) => {
        const method: AnyMethod = methods[methodId as keyof typeof app.methods];
        return {
          appId: methodId,
          methodId: methodId,
          label: method.label ?? methodId,
          description: method.description ?? undefined,
          pricing: getMethodPricing(appId, methodId),
          examples: {
            schema: createSchemaExample({ app, method }),
            sdk: createTypeScriptExample({ appId, methodId }),
            curl: createCurlExample({ appId, methodId }),
          },
        };
      });
    },
  };
};

export const getMethodPricing = (appId: string, methodId: string) => {
  const appKey = appId as keyof ApplicationRegistry;
  const app = metadata[appKey];
  if (!app) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Application ${appId} not found`,
    });
  }
  const methodKey = methodId as keyof (typeof app)['pricing'];
  const price = app['pricing'][methodKey];
  if (price == null) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Method ${methodId} not found`,
    });
  }
  return price;
};

export const convertApplicationDefinition = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app: AnyApplication
): ApplicationDetails => ({
  id: id,
  name: app.label ?? id,
  logo: app?.logo ?? '',
  description: app.description ?? '',
});

export const createSchemaExample = ({
  app,
  method,
}: {
  app: AnyApplication;
  method: AnyMethod;
}) => {
  const path = `${app.appId}.${method?.methodId}`;
  const context = convertZodSchemaToJsonSchema(app.context); // TODO: get app context from sample data.

  const input = convertZodSchemaToJsonSchema(method.input);

  const output = convertZodSchemaToJsonSchema(method.output);

  return { path, context, input, output };
};
