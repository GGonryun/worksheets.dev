import { Box, Link, Typography } from '@mui/material';
import { ListItem, OrderedList } from '@worksheets/ui-core';

export const HelpfulLinks: React.FC<{
  links: { href: string; text: string }[];
}> = ({ links }) => {
  return (
    <Box>
      <Typography variant="h6">Helpful Links:</Typography>
      <OrderedList>
        {links.map((link, index) => (
          <ListItem key={index}>
            <Link href={link.href}>{link.text}</Link>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
};
