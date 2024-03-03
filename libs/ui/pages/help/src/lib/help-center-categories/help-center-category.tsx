import { SvgIconComponent } from '@mui/icons-material';
import { alpha, Box, Typography } from '@mui/material';

export const HelpCenterCategory: React.FC<{
  title: string;
  description: string;
  href: string;
  icon: SvgIconComponent;
}> = (props) => {
  return (
    <Box
      component="a"
      href={props.href}
      sx={{
        border: (theme) => `2px solid ${theme.palette.text.blue.dark}`,
        borderRadius: (theme) => theme.shape.borderRadius / 2,
        display: 'grid',
        placeItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        p: 3,
        textDecoration: 'none',
        cursor: 'pointer',
        height: 240,
        transition: 'all 0.3s ease',
        '&:hover': {
          background: (theme) => alpha(theme.palette.text.blue.dark, 0.1),
          color: (theme) => theme.palette.text.blue.light,
          transform: 'scale(1.05)',
        },
      }}
    >
      <props.icon
        sx={{
          height: 64,
          width: 64,
        }}
      />
      <Box>
        <Typography
          variant="h6"
          color={(theme) => theme.palette.text.blue.dark}
        >
          {props.title}
        </Typography>
        <Typography
          typography={{ xs: 'body2', sm: 'body1' }}
          fontWeight={{ xs: 500, sm: 500 }}
          color={(theme) => theme.palette.text.blue.light}
        >
          {props.description}
        </Typography>
      </Box>
    </Box>
  );
};

export type HelpCenterCategoryProps = React.ComponentProps<
  typeof HelpCenterCategory
>;
