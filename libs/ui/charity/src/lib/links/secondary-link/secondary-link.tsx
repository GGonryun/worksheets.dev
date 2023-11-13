import { Link, LinkProps, styled } from '@mui/material';

export const SecondaryLink = styled((props) => <Link {...props} />)<LinkProps>(
  ({ theme }) => ({
    fontFamily: theme.typography.secondary.fontFamily,
    color: theme.palette.primary.dark,
    textDecorationColor: theme.palette.primary.dark,
  })
);
