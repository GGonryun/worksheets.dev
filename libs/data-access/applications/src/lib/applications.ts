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
import { AnyMethod } from '@worksheets/apps-core';
import { createMethodExamples } from './examples';
import { MethodMetadata, metadata } from '@worksheets/apps-metadata';
import {
  ConnectionField,
  ConnectionFields,
  connections,
  connectionValidationFunctions,
  connectionTranslationFunctions,
  ConnectionContextTranslationFunctions,
  GenericConnectionValidationFunction,
} from '@worksheets/apps-connections';
import { TRPCError } from '@trpc/server';
import { ConnectionEntity } from '@worksheets/schemas-connections';
import { BaseOAuthOptions, OAuthClient } from '@worksheets/util/oauth/client';

export interface ApplicationsDatabase {
  get(appId: string): ApplicationBasics;
  list(): ListApplicationsResponse;
  isVisibleInGallery(appId: string): boolean;
  isFeatured(appId: string): boolean;
  getMethodDetails(appId: string): ListApplicationMethodDetailsResponse;
  getDetails(appId: string): GetApplicationDetailsResponse;
  supportsConnections(appId: string): boolean;
  getConnectionDetails(appId: string): GetApplicationConnectionDetailsResponse;
  getConnectionFields(appId: string): ConnectionFields;
  getConnectionField(appId: string, fieldId: string): ConnectionField;
  getValidationFn(appId: string): GenericConnectionValidationFunction;
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

const getDetails = (appId: string): GetApplicationDetailsResponse => {
  const key = appId as keyof ApplicationRegistry;

  const {
    title,
    tutorialUrl,
    creator,
    lastUpdated,
    categories,
    tags,
    faq,
    description,
    subtitle,
    logo,
  } = metadata[key];

  return {
    appId: key,
    title: title ?? key,
    subtitle,
    logo,
    faq,
    creator,
    description,
    lastUpdated,
    tutorial: tutorialUrl,
    categories,
    tags,
  };
};

export const newApplicationsDatabase = (): ApplicationsDatabase => {
  return {
    get: (appId: string) => {
      const key = appId as keyof ApplicationRegistry;
      return convertApplicationDefinition(key);
    },
    list: () => {
      return Object.keys(registry).map((appId) => {
        const details = getDetails(appId);
        return {
          id: appId,
          name: details.title,
          logo: details.logo,
          description: details.description,
          categories: details.categories,
          tags: details.tags,
          lastUpdated: details.lastUpdated,
        };
      });
    },
    isVisibleInGallery: (appId: string) => {
      const app = metadata[appId as ApplicationRegistryKeys];
      return app.enabled;
    },
    isFeatured: (appId: string) => {
      const app = metadata[appId as ApplicationRegistryKeys];
      return app.tags.includes('featured' || 'popular');
    },
    getDetails,
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
        const methodSchema: AnyMethod = appSchema.methods[methodId];
        return {
          appId: key,
          methodId: methodId,
          label: methodMetadata.title ?? methodId,
          description: methodMetadata.description ?? undefined,
          pricing: getMethodPricing(appId, methodId),
          examples: createMethodExamples(appSchema, methodSchema),
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
    // TODO: what is refresh connection doing here? it _actually_ refreshes connections.
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
    getValidationFn: (appId: string): GenericConnectionValidationFunction => {
      const key = appId as ApplicationRegistryKeys;

      const validationFunction = connectionValidationFunctions[key];
      if (!validationFunction) {
        throw new TRPCError({
          code: 'METHOD_NOT_SUPPORTED',
          message: `Application ${key} does not support connections`,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return validationFunction as GenericConnectionValidationFunction;
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
