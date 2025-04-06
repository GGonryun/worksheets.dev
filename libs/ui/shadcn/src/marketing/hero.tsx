import Link from 'next/link';
import { Button } from '../ui/button';
import { ContainImage } from '@worksheets/ui/components/images';

export type HeroProps = {
  image?: {
    src: string;
    alt: string;
  };
  heading?: string;
  description?: string;
  primary?: {
    text: string;
    url: string;
  };
  secondary?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
};

export const Hero = ({
  image = { src: '/placeholder.svg', alt: 'placeholder' },
  heading = 'Lorem Ipsum Dolor',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  primary = {
    text: 'Get Started',
    url: '#',
  },
  secondary = {
    text: 'Learn More',
    url: '#',
  },
}: HeroProps) => {
  return (
    <section className="h-screen bg-slate-200 flex items-center justify-center">
      <div className="container text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-2 md:gap-4 lg:gap-6">
          <div className="relative h-36 md:h-48 lg:h-64 w-full mx-auto">
            <ContainImage src={image.src} alt={image.alt} />
          </div>
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild size="lg" className="mt-10">
            <Link href={primary.url}>{primary.text}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="mt-10">
            <Link href={secondary.url}>{secondary.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
