import { Chip, ChipProps, styled, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { GameSubmissionStatus } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { CoverImage } from '@worksheets/ui/components/images';
import theme from '@worksheets/ui/theme';
import { BasicGameSubmission } from '@worksheets/util/types';
import React, { JSXElementConstructor } from 'react';

const statusColor: Record<GameSubmissionStatus, ChipProps['color']> = {
  [GameSubmissionStatus.DRAFT]: 'default',
  [GameSubmissionStatus.PENDING]: 'warning',
  [GameSubmissionStatus.ACCEPTED]: 'success',
  [GameSubmissionStatus.REJECTED]: 'error',
  [GameSubmissionStatus.DELETED]: 'default',
};

export const GameSubmission: React.FC<
  BasicGameSubmission & {
    onDelete: () => void;
  }
> = ({ id, title, slug, status, tooltip, thumbnail, onDelete }) => {
  const editUrl = routes.account.submissions.edit.path({
    params: { submissionId: id },
  });
  const playUrl = slug
    ? routes.game.path({ params: { gameId: slug } })
    : routes.play.path();
  const approved = status === GameSubmissionStatus.ACCEPTED;

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        width: '100%',
        maxWidth: 440,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxSizing: 'border-box',
        display: 'flex',
      }}
    >
      <Box
        component="a"
        href={approved ? playUrl : editUrl}
        sx={{
          color: 'inherit',
          position: 'relative',
          height: { xs: 64, sm: 92 },
          width: { xs: 64, sm: 92 },
          minWidth: { xs: 64, sm: 92 },
        }}
      >
        <Thumbnail src={thumbnail} alt={`${title} thumbnail`} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Typography
          variant="h5"
          component="a"
          href={approved ? playUrl : editUrl}
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            pl: 1.5,
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            color: (theme) => theme.palette.text.primary,
            textDecoration: 'none',

            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {title || 'Untitled Game'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 0.5,
            px: 1.5,
            gap: 1,
            backgroundColor: (theme) => theme.palette.grey[100],
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <CustomLink href={editUrl}>Edit</CustomLink>
            <CustomLink hidden={approved} onClick={onDelete}>
              Delete
            </CustomLink>
          </Box>
          <Tooltip
            title={tooltip}
            sx={{
              fontFamily: theme.typography.body3.fontFamily,
              textTransform: 'none',
            }}
          >
            <Chip
              label={status}
              size="small"
              color={statusColor[status]}
              component="a"
              href={editUrl}
              clickable
              sx={{
                fontFamily: theme.typography.body3.fontFamily,
                fontSize: '0.75rem',
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

const Thumbnail: React.FC<{ src: string | null; alt: string }> = ({
  src,
  alt,
}) =>
  src ? (
    <CoverImage src={src} alt={alt} />
  ) : (
    <Typography
      variant="body3"
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        height: 'calc(100% + 2px)',
        width: 'calc(100% + 2px)',
        m: '-1px',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
      }}
    >
      No image
    </Typography>
  );

const CustomLink = styled<
  JSXElementConstructor<
    LinkProps & {
      hidden?: boolean;
    }
  >
>((props) => <Link color="inherit" {...props} />, {
  shouldForwardProp(propName) {
    return propName !== 'hidden';
  },
})(({ hidden, theme }) => ({
  display: hidden ? 'none' : 'block',
  fontFamily: theme.typography.body3.fontFamily,
  textTransform: 'none',
  fontSize: '0.75rem',
  color: theme.palette.grey[700],
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.grey[900],
    textDecoration: 'underline',
  },
}));
