import { Box } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';

export const ActivationCodeImage: React.FC<{
  src: string;
  alt: string;
  width?: number;
}> = ({ src, width, alt }) => {
  return (
    <Box
      sx={{
        width,
        position: 'relative',
        aspectRatio: '460/215',
      }}
    >
      <FillImage src={src} alt={alt} />
    </Box>
  );
};
