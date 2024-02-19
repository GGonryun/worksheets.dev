import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { routes } from '@worksheets/ui/routes';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export const adminMiddleware =
  <Props = object>(
    processor: (
      ctx: GetServerSidePropsContext,
      trpc: Awaited<ReturnType<typeof createServerSideTRPC>>
    ) => Promise<GetServerSidePropsResult<Props>>
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const trpc = await createServerSideTRPC(ctx);

    const user = await trpc.user.get.fetch();

    if (user.type !== 'ADMIN') {
      return {
        redirect: {
          destination: routes.home.path(),
          permanent: false,
        },
      };
    }

    return processor(ctx, trpc);
  };
