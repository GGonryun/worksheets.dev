'use client';

import { QuestionAnswer } from '@worksheets/util/types';
import React from 'react';

import { LdJsonScript } from './ld-json';

export const helpPageJson = (qa: QuestionAnswer[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa
      .filter((data) => Boolean(data.summary))
      .map((data) => ({
        '@type': 'Question',
        name: data.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: data.summary,
        },
      })),
  };
};

export type FAQPageLdJsonProps = { qa: QuestionAnswer[] };

export const FAQPageLdJson: React.FC<FAQPageLdJsonProps> = (props) => {
  return <LdJsonScript json={helpPageJson(props.qa)} />;
};
