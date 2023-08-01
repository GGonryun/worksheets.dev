import {
  ApplicationBasics,
  GetApplicationConnectionDetailsResponse,
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';
import {
  ApplicationRegistry,
  ApplicationRegistryKeys,
  registry,
} from '@worksheets/apps-registry';
import { convertZodSchemaToJsonSchema } from '@worksheets/util-json';
import { AnyApplication, AnyMethod } from '@worksheets/apps-core';
import { createCurlExample, createTypeScriptExample } from './examples';
import { MethodMetadata, metadata } from '@worksheets/apps-metadata';
import {
  ConnectionField,
  ConnectionFields,
  connections,
  connectionValidationFunctions,
  connectionTranslationFunctions,
  ConnectionContextTranslationFunctions,
} from '@worksheets/apps-connections';
import { TRPCError } from '@trpc/server';
import { formatTimestampLong } from '@worksheets/util/time';
import {
  ConnectionStatuses,
  ConnectionEntity,
} from '@worksheets/schemas-connections';
import { BaseOAuthOptions, OAuthClient } from '@worksheets/util/oauth/client';

export interface ApplicationsDatabase {
  get(appId: string): ApplicationBasics;
  list(): ListApplicationsResponse;
  isVisibleInGallery(appId: string): boolean;
  getMethodDetails(appId: string): ListApplicationMethodDetailsResponse;
  getDetails(appId: string): GetApplicationDetailsResponse;
  supportsConnections(appId: string): boolean;
  getConnectionDetails(appId: string): GetApplicationConnectionDetailsResponse;
  getConnectionFields(appId: string): ConnectionFields;
  getConnectionField(appId: string, fieldId: string): ConnectionField;
  validateConnection(
    appId: string,
    fields: Record<string, string>
  ): Promise<{ status: ConnectionStatuses; error?: string }>;
  refreshConnection(
    connection: ConnectionEntity
  ): Promise<{ connection: ConnectionEntity; refreshed: boolean }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translateConnectionToContext(connection: ConnectionEntity): Promise<any>;
}

const getConnectionFields = (appId: string): ConnectionFields => {
  const key = appId as keyof ApplicationRegistry;
  const connection = connections[key];
  if (!connection) {
    throw new TRPCError({
      code: 'METHOD_NOT_SUPPORTED',
      message: `Application ${appId} does not support connections`,
    });
  }

  return connection.fields;
};

export const newApplicationsDatabase = (): ApplicationsDatabase => {
  return {
    get: (appId: string) => {
      const key = appId as keyof ApplicationRegistry;
      return convertApplicationDefinition(key);
    },
    list: () => {
      return Object.keys(registry).map((appId) => {
        const key = appId as keyof ApplicationRegistry;
        return convertApplicationDefinition(key);
      });
    },
    isVisibleInGallery: (appId: string) => {
      const app = metadata[appId as ApplicationRegistryKeys];
      return app.enabled;
    },
    getDetails: (appId: string): GetApplicationDetailsResponse => {
      const key = appId as keyof ApplicationRegistry;

      const {
        title,
        tutorialUrl,
        creator,
        lastUpdated,
        categories,

        description,
        subtitle,
        logo,
      } = metadata[key];

      return {
        appId: key,
        title: title ?? key,
        subtitle: subtitle,
        logo: logo,
        creator: creator,
        description: description,
        lastUpdated: formatTimestampLong(lastUpdated),
        tutorial: tutorialUrl,
        categories: categories,
      };
    },
    getMethodDetails: (appId: string): ListApplicationMethodDetailsResponse => {
      const key = appId as keyof ApplicationRegistry;
      const appSchema = registry[key];
      const appMetadata = metadata[key];
      const methods = appMetadata.methods;
      if (!methods) {
        return [];
      }

      return Object.keys(methods).map((mid) => {
        const methodId = mid as keyof typeof appMetadata.methods;
        const methodMetadata: MethodMetadata = methods[methodId];
        const methodSchema = appSchema.methods[methodId];
        return {
          appId: key,
          methodId: methodId,
          label: methodMetadata.title ?? methodId,
          description: methodMetadata.description ?? undefined,
          pricing: getMethodPricing(appId, methodId),
          examples: {
            schema: createSchemaExample({
              app: appSchema,
              method: methodSchema,
            }),
            sdk: createTypeScriptExample({ appId, methodId }),
            curl: createCurlExample({ appId, methodId }),
          },
        };
      });
    },
    supportsConnections: (appId: string): boolean => {
      const key = appId as keyof ApplicationRegistry;
      const connectionMetadata = connections[key];
      return Boolean(connectionMetadata);
    },
    getConnectionDetails: (
      appId: string
    ): GetApplicationConnectionDetailsResponse => {
      const key = appId as keyof ApplicationRegistry;
      const appMetadata = metadata[key];
      const connectionDetails = connections[key];
      if (!connectionDetails || !appMetadata) {
        throw new TRPCError({
          code: 'METHOD_NOT_SUPPORTED',
          message: `Application ${appId} does not support connections`,
        });
      }

      return {
        logo: appMetadata.logo,
        appId: key,
        title: appMetadata.title,
        setupTime: connectionDetails.setupTime,
        instructions: connectionDetails.instructions,
        security: connectionDetails.security,
        tutorialUrl: connectionDetails.tutorialUrl,
      };
    },
    getConnectionFields,
    getConnectionField: (appId: string, fieldId: string): ConnectionField => {
      const key = appId as keyof ApplicationRegistry;
      const connection = connections[key];
      if (!connection) {
        throw new TRPCError({
          code: 'METHOD_NOT_SUPPORTED',
          message: `Application ${appId} does not support connections`,
        });
      }

      const fieldKey = fieldId as keyof typeof connection.fields;
      const field: ConnectionField = connection.fields[fieldKey];
      if (!field) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Application ${appId} does not support field ${fieldId}`,
        });
      }

      return field;
    },
    refreshConnection: async (
      connection: ConnectionEntity
    ): Promise<{ connection: ConnectionEntity; refreshed: boolean }> => {
      const fields = getConnectionFields(connection.appId);
      // for each field refresh oauth data.
      let refreshed = false;
      for (const key in fields) {
        const field = fields[key];
        if (field.type !== 'oauth') continue;

        const value = connection.fields[key];
        const latest = await refreshOAuthToken(value, field.options);
        if (!latest.refreshed) continue;

        refreshed = true;
        connection.fields[key] = latest.raw;
      }

      return {
        connection,
        refreshed,
      };
    },
    // always refresh connection state before using it.
    validateConnection: async (
      appId: string,
      fields: Record<string, string>
    ): Promise<{ status: ConnectionStatuses; error?: string }> => {
      const key = appId as ApplicationRegistryKeys;

      const validationFunction = connectionValidationFunctions[key];
      if (!validationFunction) {
        throw new TRPCError({
          code: 'METHOD_NOT_SUPPORTED',
          message: `Application ${key} does not support connections`,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validation = await validationFunction(fields as any);
      if (validation.error) {
        return { status: 'error', error: validation.error };
      } else if (validation.warning) {
        return { status: 'warning', error: validation.warning };
      } else {
        // needs to clear the error by passing an empty string
        return { status: 'active', error: '' };
      }
    },
    // always refresh connection state before using it.
    translateConnectionToContext: async (connection: ConnectionEntity) => {
      // find appropraite translation
      const key =
        connection.appId as keyof ConnectionContextTranslationFunctions;
      const translation = connectionTranslationFunctions[key];
      if (!translation) {
        throw new TRPCError({
          code: 'METHOD_NOT_SUPPORTED',
          message: `Application ${key} does not support connection translations`,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return translation(connection.fields as any);
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
  const method: MethodMetadata =
    app['methods'][methodId as keyof (typeof app)['methods']];
  method;
  if (!method) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Method ${methodId} not found`,
    });
  }
  return method.pricing;
};

export const convertApplicationDefinition = (id: string): ApplicationBasics => {
  const app = metadata[id as ApplicationRegistryKeys];

  return {
    id: id,
    name: app.title ?? id,
    logo: app?.logo ?? '',
    description: app.description ?? '',
  };
};

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

const refreshOAuthToken = async (
  raw: string,
  options: BaseOAuthOptions
): Promise<{ refreshed: boolean; raw: string }> => {
  if (!raw)
    // don't try to refresh empty values
    return { refreshed: false, raw: '' };

  const client = new OAuthClient(options);

  const token = client.deserialize(raw as string);

  if (token.expired() && token.refreshToken) {
    console.log('[OAUTH] found expired token');
    const refreshed = await token.refresh();
    const serialized = client.serialize(refreshed);
    // save refreshed token.
    console.log('[OAUTH] refreshed expired token');
    return {
      refreshed: true,
      raw: serialized,
    };
  }

  return { raw, refreshed: false };
};
