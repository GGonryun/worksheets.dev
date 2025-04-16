import { Markdown } from '@worksheets/ui-core';
import { privacyStatement } from '@worksheets/util/legal';

export const PrivacyStatement = () => {
  return (
    <Markdown
      text={privacyStatement}
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
      }}
    />
  );
};
