import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import {
  DeveloperScreen,
  DeveloperScreenProps,
} from '@worksheets/ui/pages/developer';
import { notFound } from 'next/navigation';

export type DeveloperPageProps = {
  params: {
    developerId: string;
  };
};

export const getStaticProps = async (
  developerId: string
): Promise<DeveloperScreenProps> => {
  try {
    const trpc = await createStaticTRPC();
    return await trpc.public.developers.find.fetch({
      developerId,
    });
  } catch (error) {
    notFound();
  }
};

export const generateStaticParams = async () => {
  const trpc = await createStaticTRPC();
  const developers = await trpc.public.developers.list.fetch();
  return developers.map((developer) => ({
    developerId: developer.id,
  }));
};

export const generateMetadata = async ({ params }: DeveloperPageProps) => {
  const { developer } = await getStaticProps(params.developerId);
  return {
    title: developer.name,
    description: `Learn more about ${developer.name} and their games on Charity Games.`,
    images: [
      {
        url: developer.avatarUrl,
        alt: developer.name,
      },
    ],
  };
};

export default async function Page({ params }: DeveloperPageProps) {
  const props = await getStaticProps(params.developerId);
  return <DeveloperScreen {...props} />;
}
