import {
  ApplicationMethodKeys,
  ApplicationRegistry,
} from '@worksheets/apps-registry';

export type ApplicationMetadataMask = {
  [K in keyof ApplicationRegistry]: {
    enabled: boolean;
    tutorial: string; //website
    lastUpdated: string; // user friendly date.
    overview: string;
    creator: string;
    pricing: {
      [MethodKey in ApplicationMethodKeys<K>]: number;
    };
  };
};
