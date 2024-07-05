import { GOOGLE_AD_PLACEMENT_API } from '../data';

export const InitializeGoogleAdsense: React.FC = () => (
  // TODO: not sure why this doesn't work if we use a Next.js script tag
  <script
    data-ad-frequency-hint="30s"
    data-adbreak-test="on"
    src={GOOGLE_AD_PLACEMENT_API}
    crossOrigin="anonymous"
    async
  />
);
