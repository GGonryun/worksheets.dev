import {
  ApplicationRegistryKeys,
  InferApplicationContext,
} from '@worksheets/apps-registry';
import { ServiceEndpoint } from '@worksheets/services-core';
import {
  ServiceRegistry,
  ServiceRegistryKeys,
} from '@worksheets/services-registry';
import { Split, UnionToIntersection } from '@worksheets/util/types';
import { ZodTypeAny, z } from '@worksheets/zod';

export type EndpointProviderKeys<S, E> = keyof getServiceEndpoint<
  S,
  E
>['providers'];

export type ServiceBridgeRegistry = {
  [S in ServiceRegistryKeys]: ServiceProviderBridges<S>;
};

export type ServiceProviderBridges<S> = S extends ServiceRegistryKeys
  ? {
      [E in keyof ServiceRegistry[S]['endpoints']]: EndpointProviderBridges<
        S,
        E
      >;
    }
  : never;

export type AnyEndopintProviderBridges = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (options: any) => Promise<any>
>;

export type EndpointProviderBridges<S, E> = S extends ServiceRegistryKeys
  ? E extends keyof ServiceRegistry[S]['endpoints']
    ? ServiceRegistry[S]['endpoints'][E] extends ServiceEndpoint<
        infer P,
        unknown,
        unknown
      >
      ? UnionToIntersection<
          P extends string
            ? {
                [AppKey in P]: EndpointProviderBridge<S, E, AppKey>;
              }
            : never
        >
      : never
    : never
  : never;

/**
 * Convenience type for getting the handlers for a specific endpoint
 * @example
 * type SendEmailHandlers = EndpointProviderHandlersByPath<'email.send'>
 */
export type EndpointProviderBridgesByPath<P> = EndpointProviderBridges<
  getServiceKey<P>,
  getEndpointKey<P>
>;

export type EndpointProviderBridge<S, E, A> = S extends ServiceRegistryKeys
  ? E extends keyof ServiceRegistry[S]['endpoints']
    ? A extends ApplicationRegistryKeys
      ? (opts: {
          context: InferApplicationContext<A>;
          input: InferEndpointInput<S, E>;
        }) => Promise<InferEndpointOutput<S, E>>
      : (opts: {
          context?: unknown;
          input: InferEndpointInput<S, E>;
        }) => Promise<InferEndpointOutput<S, E>>
    : never
  : never;

export type InferEndpointInput<S, E> = getServiceEndpoint<
  S,
  E
>['input'] extends ZodTypeAny
  ? z.infer<getServiceEndpoint<S, E>['input']>
  : never;

export type InferEndpointOutput<S, E> = getServiceEndpoint<
  S,
  E
>['output'] extends ZodTypeAny
  ? z.infer<getServiceEndpoint<S, E>['output']>
  : never;

/** Internal syntactic sugar for locating service endpoints */
export type splitServicePath<P> = P extends string ? Split<P, '.'> : never;
export type getServiceKey<P> = splitServicePath<P>[0];
export type getEndpointKey<P> = splitServicePath<P>[1];
export type getProviderKey<P> = splitServicePath<P>[2];

/** Internal helper method that finds a service endpoint in the registry by id */
export type getServiceEndpoint<ServiceKey, EndpointKey> =
  ServiceKey extends ServiceRegistryKeys
    ? EndpointKey extends keyof ServiceRegistry[ServiceKey]['endpoints']
      ? ServiceRegistry[ServiceKey]['endpoints'][EndpointKey] extends ServiceEndpoint<
          infer P,
          infer I,
          infer O
        >
        ? ServiceEndpoint<P, I, O>
        : never
      : never
    : never;

export type EndpointProviderBridgeByPath<P> = EndpointProviderBridge<
  getServiceKey<P>,
  getEndpointKey<P>,
  getProviderKey<P>
>;
