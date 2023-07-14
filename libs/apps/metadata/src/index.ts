import { ApplicationMask } from '@worksheets/apps-registry';
import { ApplicationMetadata } from '@worksheets/schemas-applications';

const metadata: ApplicationMask<ApplicationMetadata> = {
  time: {
    enabled: true,
    public: true,
    gallery: true,
    external: false,
  },
  openai: {
    enabled: true,
    public: true,
    gallery: true,
    external: true,
  },
  sys: {
    enabled: true,
    public: false,
    gallery: false,
    external: false,
  },
  math: {
    enabled: true,
    public: true,
    gallery: false,
    external: false,
  },
};

export default metadata;
