import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from '@mui/material/Modal';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { CircularProgress, Typography } from '@mui/material';
import { CoverImage } from '../cover-image';
import { useImageSize } from '../hooks/useImageSize';
import { ContainImage } from '../contain-image';
import { useFileName } from '@worksheets/ui-core';

export const ImageUpload: FC<{
  src?: string;
  height: number;
  width: number;
  onDelete: () => void;
}> = ({ src, height, width, onDelete }) => {
  const [open, setOpen] = useState(false);

  const uploaded = Boolean(src);
  return (
    <>
      {src && (
        <ZoomImageModal src={src} open={open} onClose={() => setOpen(false)} />
      )}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          cursor: uploaded ? 'pointer' : 'default',
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
        <DeleteImageButton visible={uploaded} onClick={onDelete} />
        <ZoomImageButton visible={uploaded} onClick={() => setOpen(true)} />
        {src ? <RenderImage src={src} /> : <CircularProgress size={50} />}
      </Box>
    </>
  );
};

const ZoomImageButton: FC<{ visible: boolean; onClick: () => void }> = ({
  onClick,
  visible,
}) => (
  <Button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    variant="contained"
    color="white"
    startIcon={
      <ZoomInIcon
        sx={{
          height: '18px',
          width: '18px',
          mr: '-6px',
          mb: '2px',
        }}
      />
    }
    sx={{
      display: visible ? 'span' : 'none',
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      padding: (theme) => theme.spacing(0, 1),
      margin: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      textTransform: 'none',
      fontSize: (theme) => theme.typography.body2.fontSize,
      fontFamily: (theme) => theme.typography.body2.fontFamily,
      color: (theme) => theme.palette.primary.main,
    }}
  >
    View
  </Button>
);

const DeleteImageButton: FC<{ visible: boolean; onClick: () => void }> = ({
  visible,
  onClick,
}) => (
  <Button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
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
      display: visible ? 'span' : 'none',
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
    Delete
  </Button>
);

const RenderImage: FC<{
  src: string;
}> = ({ src }) => {
  const { name } = useFileName(src);

  return <CoverImage alt={name} src={src} />;
};

const ZoomImageModal: FC<{
  open: boolean;
  onClose: () => void;
  src: string;
}> = ({ src, open, onClose }) => {
  const handleClose = () => onClose();

  const { name } = useFileName(src);
  const { dimensions, loading, error } = useImageSize(src);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        {loading && <CircularProgress />}
        {error && <Typography>error</Typography>}
        {dimensions && (
          <Box
            onClick={handleClose}
            sx={{
              outline: 'none',
              position: 'relative',
              maxHeight: '90vh',
              maxWidth: '90vw',
              height: dimensions.height,
              width: dimensions.width,
              aspectRatio: dimensions.width / dimensions.height,
            }}
          >
            <ContainImage alt={`${name} image preview`} src={src} />
          </Box>
        )}
      </Box>
    </Modal>
  );
};
