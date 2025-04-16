import { trpc } from '@worksheets/trpc-charity';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { DynamicPreviewScreenContainer } from '@worksheets/ui/pages/game';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { NextSeo, NextSeoProps, VideoGameJsonLdProps } from 'next-seo';

import { previewSeo } from '../../util/seo';

type Props = {
  game: SerializableGameSchema;
  seo: NextSeoProps;
  jsonLd: VideoGameJsonLdProps;
  developer: DeveloperSchema;
};

const Page: NextPageWithLayout<Props> = () => {
  const { query } = useRouter();
  const gameId = query.gameId as string;
  const search = trpc.public.games.find.useQuery({
    gameId,
  });

  if (search.isPending) {
    return <LoadingScreen />;
  }

  if (search.isError) {
    return <ErrorScreen />;
  }

  return (
    <>
      <NextSeo {...previewSeo} />
      <DynamicPreviewScreenContainer
        game={search.data.game}
        developer={search.data.developer}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
