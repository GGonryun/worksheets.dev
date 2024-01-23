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
      size={isMobile ? 'small' : 'medium'}
      href={href}
      color={color}
      sx={{
        px: isMobile ? 1.25 : 1.75,
        py: isMobile ? 0.75 : 1.25,
      }}
      startIcon={
        <Box
          sx={{
            height: isMobile ? 32 : 40,
            width: isMobile ? 32 : 40,
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
            height={isMobile ? 24 : 32}
            width={isMobile ? 24 : 32}
          />
        </Box>
      }
    >
      <Typography
        fontWeight={600}
        fontSize={(theme) =>
          isMobile
            ? theme.typography.body2.fontSize
            : theme.typography.body1.fontSize
        }
        textTransform="none"
        lineHeight={
          isMobile
            ? theme.typography.body2.fontSize
            : theme.typography.body1.fontSize
        }
        textAlign="left"
        minWidth={isMobile ? 56 : 72}
        whiteSpace={'pre-wrap'}
        pl={0.25}
        pr={0.5}
      >
        {text}
      </Typography>
    </Button>
  );
};

export type CategoryProps = React.ComponentProps<typeof Category>;
