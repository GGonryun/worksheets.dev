import { Box, Link, LinkProps, styled, Typography } from '@mui/material';
import { MonsterSchema } from '@worksheets/util/types';

export const TitleBar: React.FC<{ monster: MonsterSchema; href?: string }> = (
  props
) => (
  <Box
    sx={{
      display: { xs: 'flex', sm: 'grid' },
      justifyContent: { xs: 'space-between', sm: 'unset' },
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 0.5fr' },
      backgroundColor: (theme) => theme.palette.background['solid-blue'],
    }}
    gap={1}
    py={{ xs: 0.5, sm: 1 }}
    px={{ xs: 1, sm: 2 }}
  >
    <LinkText href={props.href}>{props.monster.name}</LinkText>
    <LinkText href={props.href}>Monster ID #{props.monster.id}</LinkText>
    <LinkText textAlign="center" display={{ xs: 'none', md: 'block' }}>
      Resistances
    </LinkText>
  </Box>
);

const LinkText = styled((props: LinkProps) => (
  <Typography
    variant="body1"
    fontWeight={900}
    color="text.arcade"
    component={Link}
    underline={props.href ? 'hover' : 'none'}
    href={props.href}
    {...props}
  />
))(({ theme, href }) => ({
  cursor: href ? 'pointer' : 'default',
}));
