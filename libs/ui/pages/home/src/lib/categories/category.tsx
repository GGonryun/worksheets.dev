import {
  Box,
  Button,
  ButtonProps,
  Palette,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

type AcceptableColors = Extract<
  keyof Palette,
  'primary' | 'warning' | 'success' | 'error' | 'secondary'
>;

export const Category: React.FC<{
  href: string;
  color: ButtonProps['color'];
  text: string;
  imageSrc: string;
}> = ({ href, color = 'primary', text, imageSrc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
      variant="arcade"
      href={href}
      color={color}
      sx={{
        px: isMobile ? 1.25 : 1.75,
        py: isMobile ? 0.75 : 1.25,
      }}
      startIcon={
        <Box
          sx={{
            height: isMobile ? 36 : 72,
            width: isMobile ? 36 : 72,
            display: 'grid',
            placeItems: 'center',
            borderRadius: (theme) => theme.shape.borderRadius * 0.5,
            backgroundColor: (theme) =>
              theme.palette[color as AcceptableColors].dark,
          }}
        >
          <Image
            src={imageSrc}
            alt={text}
            height={isMobile ? 24 : 48}
            width={isMobile ? 24 : 48}
          />
        </Box>
      }
    >
      <Typography
        fontWeight={600}
        fontSize={isMobile ? '0.875rem' : '1.5rem'}
        textTransform="none"
        lineHeight={isMobile ? '1rem' : '1.75rem'}
        textAlign="left"
        minWidth={isMobile ? 60 : 100}
        whiteSpace={'pre-wrap'}
        pl={isMobile ? 0.0 : 1}
        pr={isMobile ? 0.5 : 1}
      >
        {text}
      </Typography>
    </Button>
  );
};

export type CategoryProps = React.ComponentProps<typeof Category>;
