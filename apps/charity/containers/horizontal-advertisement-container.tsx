import { horizontalBannerAd } from '@worksheets/data-access/charity-games';

export const HorizontalAdvertisementContainer = () => {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={horizontalBannerAd.client}
      data-ad-slot={horizontalBannerAd.slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};
