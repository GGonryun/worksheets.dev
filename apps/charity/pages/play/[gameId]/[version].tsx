import { trpc } from '@worksheets/trpc-charity';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { DynamicGameScreenContainer } from '@worksheets/ui/pages/game';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { SerializableGameSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { NextSeo, NextSeoProps, VideoGameJsonLdProps } from 'next-seo';

import { previewGameSeo } from '../../../util/seo';

type Props = {
  game: SerializableGameSchema;
  seo: NextSeoProps;
  jsonLd: VideoGameJsonLdProps;
};

const Page: NextPageWithLayout<Props> = () => {
  const router = useRouter();

  const gameId = router.query.gameId as string;
  const version = router.query.version as string;
  const game = trpc.user.games.preview.useQuery(
    {
      id: gameId,
      version,
    },
    {
      enabled: !!gameId && !!version,
    }
  );
  const team = trpc.public.games.team.find.useQuery(
    {
      gameId,
    },
    {
      enabled: !!gameId && !!version,
    }
  );

  if (game.isPending || team.isPending) {
    return <LoadingScreen />;
  }

  if (game.isError || team.isError) {
    return (
      <ErrorScreen
        message={parseTRPCClientErrorMessage(game.error || team.error || '')}
      />
    );
  }

  return (
    <>
      <NextSeo {...previewGameSeo()} noindex />
      <DynamicGameScreenContainer game={game.data} team={team.data} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
