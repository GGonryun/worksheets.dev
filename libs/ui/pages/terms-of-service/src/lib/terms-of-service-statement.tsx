import { Markdown } from '@worksheets/ui-core';
import { tosStatement } from '@worksheets/util/legal';

export const TermsOfServiceStatement = () => {
  return (
    <Markdown
      text={tosStatement}
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
      }}
    />
  );
};
