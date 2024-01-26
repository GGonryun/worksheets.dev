import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Link, LinkProps, styled } from '@mui/material';
import { GameTag } from '@worksheets/util/types';
import { FC, JSXElementConstructor } from 'react';

export const CategoryBreadcrumbs: FC<{ categories: GameTag[] }> = ({
  categories,
}) => {
  const gameTagBreadcrumbs = categories.map((tag) => (
    <BreadcrumbLink key={tag} href={`/tags/${tag}`}>
      {tag} games
    </BreadcrumbLink>
  ));

  const breadcrumbs = [
    <BreadcrumbLink key="1" href="/play">
      games
    </BreadcrumbLink>,
    ...gameTagBreadcrumbs,
  ];

  return (
    <StyledBreadcrumbs
      separator={<BreadcrumbSeparator />}
      aria-label="category-breadcrumbs"
    >
      {breadcrumbs}
    </StyledBreadcrumbs>
  );
};

const BreadcrumbSeparator = styled(NavigateNext)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
}));

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': {
    margin: 0,
    marginBottom: -1,
    padding: 0,
  },
  '& .MuiBreadcrumbs-li': {
    lineHeight: 1,
  },
}));

const BreadcrumbLink = styled<JSXElementConstructor<LinkProps>>((props) => (
  <Link color="inherit" underline="hover" {...props} />
))(({ theme }) => ({
  fontFamily: theme.typography.body1.fontFamily,
  fontSize: theme.typography.pxToRem(11),
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  '&:hover, &:focus': {
    color: theme.palette.text.secondary,
  },
}));
