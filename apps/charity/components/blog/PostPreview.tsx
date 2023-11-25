import { Link } from '@mui/material';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';
import { urls } from '@worksheets/ui-games';
import { Flex, useDeviceSize } from '@worksheets/ui-core';
import Image from 'next/image';
import { ArrowRightAlt } from '@mui/icons-material';
import {
  CaptionText,
  ParagraphText,
  SmallHeaderText,
} from '@worksheets/ui-charity';

export const PostPreview: FC<MarkdownMetadata> = ({
  title,
  excerpt,
  coverImage,
  date,
  author,
  tags,
  slug,
}) => {
  const { isMobile } = useDeviceSize();
  const trimmedExcerpt = excerpt.slice(0, 150) + '...';
  const url = urls.relative.blog + '/' + slug;
  const authorUrl = urls.relative.about + '#' + author.id;
  return (
    <Flex spaceBetween fullWidth gap={4}>
      <Flex column gap={1}>
        <SmallHeaderText
          sx={{
            color: 'primary.main',
          }}
        >
          <Link href={url}>{title}</Link>
        </SmallHeaderText>
        <Flex wrap gap={0.5}>
          <CaptionText sx={{ pr: 4 }}>
            {date} by{' '}
            <Link color="inherit" href={authorUrl}>
              {author.name}
            </Link>
          </CaptionText>
          <Flex gap={1}>
            {tags.map((tag) => (
              <CaptionText
                key={tag}
                fontStyle="italic"
                sx={{ color: (theme) => theme.palette.primary.main }}
              >
                #{tag}
              </CaptionText>
            ))}
          </Flex>
        </Flex>
        <Link href={url} underline="none" color="inherit">
          <ParagraphText sx={{ display: 'inline' }}>
            {trimmedExcerpt}
          </ParagraphText>{' '}
          <ParagraphText
            sx={{
              display: 'inline-flex',
              gap: 0.5,
              textDecoration: 'underline',
              fontWeight: '500',
              color: (theme) => theme.palette.grey[700],
              fontStyle: 'italic',
            }}
          >
            Continue Reading
            <ArrowRightAlt color="inherit" />
          </ParagraphText>
        </Link>
      </Flex>
      {!isMobile && (
        <Image
          src={coverImage}
          alt={`${title} image`}
          height={130}
          width={225}
        />
      )}
    </Flex>
  );
};
