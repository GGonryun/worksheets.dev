import { BackgroundColors } from '@worksheets/ui/common';
import { FC } from 'react';
import { SectionLayout } from '../section-layout';
import { AutoScroll, Flex, Spacing } from '@worksheets/ui-core';
import { ProgrammingLanguageBlock } from './programming-language-block';
import { randomized } from './supported-http-clients';
import { splitArrayEqually } from '@worksheets/util/arrays';

import { HeaderSection } from '../header-section';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Link, Typography } from '@mui/material';

export const AvailableProgrammingLanguagesSection: FC<{
  backgroundColor: BackgroundColors;
}> = ({ backgroundColor }) => {
  const divisor = 3;
  const split = splitArrayEqually(randomized, divisor);
  return (
    <SectionLayout backgroundColor={backgroundColor} maxWidth="xl">
      <Spacing bottom={3}>
        <HeaderSection
          title={'Supported Languages'}
          subtitle={
            'Our code generator works with your favorite **HTTP Client** libraries.*'
          }
          icon={
            <TinyLogo src="/art/pixels/business.svg" borderless area={42} />
          }
          dividerful
        />
      </Spacing>

      <AutoScroll height={'9em'} speed={'120s'}>
        {split[0].map((language) => (
          <ProgrammingLanguageBlock
            {...language}
            key={`${language.title}-${language.client.title}`}
          />
        ))}
      </AutoScroll>
      <AutoScroll height={'9em'} speed={'120s'} reversed>
        {split[1].map((language) => (
          <ProgrammingLanguageBlock
            {...language}
            key={`${language.title}-${language.client.title}`}
          />
        ))}
      </AutoScroll>
      <AutoScroll height={'9em'} speed={'120s'}>
        {split[2].map((language) => (
          <ProgrammingLanguageBlock
            {...language}
            key={`${language.title}-${language.client.title}`}
          />
        ))}
      </AutoScroll>
      <Spacing bottom={2} top={3}>
        <Flex column centered gap={0.5}>
          <Typography variant="body2">
            <Link color="inherit" href={'#'}>
              Browse all languages
            </Link>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            * We are always adding more languages. If you don't see your
            favorite language,{' '}
            <Link color="inherit" href={'/contact'}>
              please let us know
            </Link>
            !
          </Typography>
        </Flex>
      </Spacing>
    </SectionLayout>
  );
};
