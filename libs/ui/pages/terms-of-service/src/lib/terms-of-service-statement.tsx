import { Markdown } from '@worksheets/ui-core';
import { printDate } from '@worksheets/util/time';

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

const createdAtDate = printDate('12-01-2021');
const updatedAtDate = printDate('12-01-2021');

const tosStatement = `
# Global Privacy Statement
__Released__: ${createdAtDate}
<br/>
__Last Updated__: ${updatedAtDate}
## General Information:
Welcome to CharityGames...
`;
