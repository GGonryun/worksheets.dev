import {
  Box,
  Button,
  ButtonProps,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { ArcadeItemGrid } from './arcade-item-grid';

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
          gap: { xs: 3, sm: 3, md: 4, lg: 5 },
          borderRadius: (theme) => theme.shape.borderRadius * 2,
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        {props.header}

        <ArcadeItemGrid>{props.children}</ArcadeItemGrid>

        {props.footer}
      </Paper>
    </Box>
  );
};

export type TitledSectionProps = React.ComponentProps<typeof TitledSection>;
