import type { QuestionAnswer } from '@worksheets/util/types';
import { FAQPageJsonLd } from 'next-seo';

export const helpPageJson = (
  qa: QuestionAnswer[]
): React.ComponentProps<typeof FAQPageJsonLd>['mainEntity'] => {
  return qa
    .filter((data) => Boolean(data.summary))
    .map((data) => ({
      questionName: data.question,
      acceptedAnswerText: data.summary,
    }));
};
