import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Link, LinkProps, styled } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { GameTag } from '../../../../types/tag-schema';

export const CategoryBreadcrumbs: FC<{ categories: GameTag[] }> = ({
  categories,
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  };

  const gameTagBreadcrumbs = categories.map((tag) => (
    <BreadcrumbLink key={tag} href={`/tags/${tag}`} onClick={handleClick}>
      {tag} games
    </BreadcrumbLink>
  ));

  const breadcrumbs = [
    <BreadcrumbLink key="1" href="/" onClick={handleClick}>
      all games
    </BreadcrumbLink>,
    ...gameTagBreadcrumbs,
  ];

  return (
    <StyledBreadcrumb
      separator={<BreadcrumbSeparator />}
      aria-label="category-breadcrumbs"
    >
      {breadcrumbs}
    </StyledBreadcrumb>
  );
};

const BreadcrumbSeparator = styled(NavigateNext)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
}));

const StyledBreadcrumb = styled(Breadcrumbs)(({ theme }) => ({
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
