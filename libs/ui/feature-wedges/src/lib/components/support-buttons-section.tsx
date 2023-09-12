import { BookOutlined, ScienceOutlined, Diversity3 } from '@mui/icons-material';
import { Button, ButtonProps, lighten, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLayout, urls } from '@worksheets/ui/common';

export const SupportButtonsSection = () => {
  const { isTablet } = useLayout();
  return (
    <Grid container minHeight={isTablet ? 60 : 80}>
      <Grid xs={4} borderTop={'1px solid'} borderBottom={'1px solid'}>
        <SupportBoxButton
          color="success"
          href={urls.app.contact}
          startIcon={<BookOutlined />}
          isTablet={isTablet}
        >
          Read the docs
        </SupportBoxButton>
      </Grid>
      <Grid xs={4} border={'1px solid'}>
        <SupportBoxButton
          color="primary"
          href={urls.app.contact}
          startIcon={<ScienceOutlined />}
          isTablet={isTablet}
        >
          Find an expert
        </SupportBoxButton>
      </Grid>
      <Grid xs={4} borderTop={'1px solid'} borderBottom={'1px solid'}>
        <SupportBoxButton
          color="secondary"
          href={urls.app.contact}
          startIcon={<Diversity3 />}
          isTablet={isTablet}
        >
          Ask the community
        </SupportBoxButton>
      </Grid>
    </Grid>
  );
};

const SupportBoxButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'isTablet',
})<ButtonProps & { isTablet?: boolean }>(({ theme, color, isTablet }) => {
  const selectedColor =
    color === 'warning'
      ? theme.palette.warning.main
      : color === 'secondary'
      ? theme.palette.secondary.main
      : color === 'success'
      ? theme.palette.success.main
      : theme.palette.primary.main;

  return {
    borderRadius: 0,
    padding: theme.spacing(3),
    textTransform: 'none',
    color: theme.palette.text.primary,
    fontSize: isTablet
      ? theme.typography.body2.fontSize
      : theme.typography.body1.fontSize,
    fontWeight: 900,
    backgroundColor: lighten(selectedColor, 0.7),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: lighten(selectedColor, 0.5),
      textDecoration: 'underline',
    },
  };
});
