import { styled, Typography, TypographyProps } from '@mui/material';

export const DrawerCaption = styled(
  (props: Pick<TypographyProps, 'children'>) => (
    <Typography
      variant="body3"
      color="text.secondary"
      component={'div'}
      {...props}
    />
  )
)(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));
