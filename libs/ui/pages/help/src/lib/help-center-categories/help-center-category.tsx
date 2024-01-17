import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

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
        border: (theme) => `4px solid ${theme.palette.divider}`,
        borderRadius: (theme) => theme.shape.borderRadius / 2,
        display: 'grid',
        placeItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        p: 3,
        textDecoration: 'none',
        cursor: 'pointer',
        height: 240,
      }}
    >
      <props.icon
        sx={{
          height: 64,
          width: 64,
        }}
      />
      <Box>
        <Typography variant="h6" color="primary">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {props.description}
        </Typography>
      </Box>
    </Box>
  );
};

export type HelpCenterCategoryProps = React.ComponentProps<
  typeof HelpCenterCategory
>;
