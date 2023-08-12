import { ApplicationRegistryKeys } from '@worksheets/apps-registry';
import { ServiceCategory } from '@worksheets/schemas-services';
import { StringLiteral } from '@worksheets/util/types';
import { ZodTypeAny } from '@worksheets/zod';

export type ServiceEndpoints = {
  [key in string]: ServiceEndpoint<string, ZodTypeAny, ZodTypeAny>;
};

export type CommonService<
  EndpointId extends string,
  Endpoints extends {
    [key in EndpointId]: ServiceEndpoint<string, ZodTypeAny, ZodTypeAny>;
  },
  Providers
> = {
  id: string;
  title: string;
  subtitle: string;
  logo: string;
  category: ServiceCategory;
  endpoints: Endpoints;
  providers: Providers[];
};

export type CommonServiceMetadata = {
  id: string;
  title: string;
  subtitle: string;
  logo: string;
  category: ServiceCategory;
};

export type ServiceEndpoint<P, I, O> = {
  id: string;
  title: string;
  subtitle: string;
  logo: string;
  input: I;
  output: O;
  providers: P[];
};

export const newEndpoint = <P extends ApplicationRegistryKeys, I, O>(endpoint: {
  id: string;
  title: string;
  subtitle: string;
  logo: string;
  input: I;
  output: O;
  providers: StringLiteral<P>[];
}): ServiceEndpoint<StringLiteral<P>, I, O> => ({
  ...endpoint,
});

export const newService = <
  Providers extends ApplicationRegistryKeys,
  EndpointId extends string,
  Endpoints extends {
    [key in EndpointId]: ServiceEndpoint<Providers, ZodTypeAny, ZodTypeAny>;
  }
>(
  service: CommonService<EndpointId, Endpoints, Providers>
) => service;

export const newRegistry = <T>(services: T) => services;
