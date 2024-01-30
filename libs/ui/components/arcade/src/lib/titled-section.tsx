import {
  Box,
  Button,
  ButtonProps,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';

export const TitledSection: React.FC<{
  title: string;
  children: React.ReactNode[];
  action?: {
    color: ButtonProps['color'];
    text: string;
    href: string;
  };
  header?: React.ReactNode;
  footer?: React.ReactNode;
}> = (props) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <Box display="flex" flexDirection="column" gap={{ xs: 1.5, sm: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'centered', sm: 'flex-end' }}
      >
        <Typography
          color="white.main"
          typography={{
            xs: 'h6',
            sm: 'h5',
            md: 'h4',
          }}
          mb={-1}
        >
          {props.title}
        </Typography>
        {props.action && (
          <Button
            href={props.action.href}
            color={props.action.color}
            variant={'arcade'}
            size={isMobile ? 'small' : 'medium'}
          >
            {props.action.text}
          </Button>
        )}
      </Box>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 3, sm: 3, md: 4, lg: 5 },
          gap: { xs: 2, sm: 3, md: 4, lg: 5 },
          borderRadius: (theme) => theme.shape.borderRadius * 2,
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        {props.header}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: `repeat(2, minmax(72px, 200px))`,
              mobile1: `repeat(2, minmax(72px, 200px))`,
              mobile2: `repeat(3, minmax(72px, 200px))`,
              sm: `repeat(3, minmax(100px, 200px))`,
              desktop1: `repeat(4, minmax(100px, 200px))`,
              md: `repeat(5, minmax(100px, 200px))`,
              lg: `repeat(6, minmax(100px, 200px))`,
              xl: `repeat(6, minmax(100px, 200px))`,
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {props.children}
        </Box>
        {props.footer}
      </Paper>
    </Box>
  );
};
