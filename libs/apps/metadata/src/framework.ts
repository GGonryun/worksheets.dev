import {
  ApplicationMethodKeys,
  ApplicationRegistry,
} from '@worksheets/apps-registry';
import {
  ApplicationCategory,
  ApplicationTag,
} from '@worksheets/schemas-applications';

export type ApplicationMetadataMask = {
  [K in keyof ApplicationRegistry]: ApplicationMetadata<K>;
};

export type ApplicationMetadata<K extends keyof ApplicationRegistry> = {
  enabled: boolean;
  logo: string;
  title: string;
  subtitle: string;
  categories: ApplicationCategory[];
  tags: ApplicationTag[];
  description: string; // markdown
  creator: string;
  lastUpdated: number; // utc milliseconds
  tutorialUrl: string;
  faq: string[][];
  methods: {
    [MethodKey in ApplicationMethodKeys<K>]: MethodMetadata;
  };
};

export type MethodMetadata = {
  title: string;
  description: string;
  pricing: number;
  sourceUrl: string;
};
