import { TRPCError } from '@trpc/server';
import { getUserServiceProviderContext } from '@worksheets/feat/service-registry';
import { AnyEndopintProviderBridges } from '@worksheets/services-bridges';
import {
  CommonServiceMetadata,
  ServiceEndpoint,
} from '@worksheets/services-core';
import { ZodTypeAny } from '@worksheets/zod';
import { privateProcedure } from '../procedures';

export default <P, I extends ZodTypeAny, O extends ZodTypeAny>(args: {
  service: CommonServiceMetadata;
  endpoint: ServiceEndpoint<P, I, O>;
  bridges: AnyEndopintProviderBridges;
}) => {
  const path = `services/${args.service.id}/${args.endpoint.id}`;
  const errorHeader = `Failed to execute service (${args.service.id}) endpoint (${args.endpoint.id})`;
  return privateProcedure
    .meta({
      openapi: {
        enabled: true,
        protect: true,
        method: 'POST',
        path,
        summary: args.service.title,
        description: args.service.subtitle,
        tags: ['services', args.service.category, args.service.id],
      },
    })
    .input(args.endpoint.input)
    .output(args.endpoint.output)
    .mutation(async ({ ctx, input }) => {
      const response = await getUserServiceProviderContext({
        userId: ctx.user.uid,
        serviceId: args.service.id,
      });

      if ('error' in response) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: `${errorHeader}: ${response.error}`,
          cause: response.error,
        });
      }

      const { context, appId } = response;

      const bridge = args.bridges[appId];

      if (!bridge) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `${errorHeader}: No provider bridge found for ${appId}`,
        });
      }

      return await bridge({ context, input });
    });
};
