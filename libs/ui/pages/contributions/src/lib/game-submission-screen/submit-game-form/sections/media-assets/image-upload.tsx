import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CoverImage } from '@worksheets/ui/images';
import { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CircularProgress } from '@mui/material';

export const ImageUpload: FC<
  | {
      src: string;
      alt: string;
      height: number;
      width: number;
      status: 'uploaded';
    }
  | {
      src: never;
      alt: never;
      height: number;
      width: number;
      status: 'uploading';
    }
> = ({ src, alt, height, width, status }) => (
  <Box
    sx={{
      height,
      width,
      display: 'grid',
      placeItems: 'center',
      position: 'relative',
      border: (theme) => `1px solid ${theme.palette.divider}`,
      overflow: 'hidden',
      borderRadius: (theme) => theme.shape.borderRadius / 3,
      padding: (theme) => theme.spacing(1, 2),
    }}
  >
    <Button
      variant="contained"
      color="white"
      startIcon={
        <DeleteOutlineIcon
          sx={{
            height: '18px',
            width: '18px',
            mr: '-6px',
            mb: '2px',
          }}
        />
      }
      sx={{
        display: src ? 'span' : 'none',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        boxSizing: 'border-box',
        padding: (theme) => theme.spacing(0, 1),
        margin: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        textTransform: 'none',
        fontSize: (theme) => theme.typography.body2.fontSize,
        fontFamily: (theme) => theme.typography.body2.fontFamily,
        color: (theme) => theme.palette.error.main,
      }}
    >
      Delete File
    </Button>
    {status === 'uploading' ? (
      <CircularProgress size={72} />
    ) : (
      <CoverImage alt={alt} src={src} />
    )}
  </Box>
);
