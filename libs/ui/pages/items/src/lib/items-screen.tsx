import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ContainImage } from '@worksheets/ui/components/images';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { ItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

const Screen: React.FC<{ items: ItemSchema[] }> = (props) => (
  <Container
    maxWidth="md"
    sx={{
      py: 4,
    }}
  >
    <Typography
      typography={{ xs: 'h4', mobile2: 'h3', md: 'h2' }}
      sx={{ textAlign: 'center' }}
      color="text.arcade"
      gutterBottom
    >
      Item Database
    </Typography>
    <Box
      sx={{
        mt: 4,
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          mobile1: 'repeat(auto-fill, minmax(150px, 1fr))',
          sm: 'repeat(auto-fill, minmax(200px, 1fr))',
        },
        gridAutoRows: 200,
        gap: 2,
      }}
    >
      {props.items.map((item) => (
        <ItemBox key={item.id} item={item} />
      ))}
    </Box>
  </Container>
);

const ItemBox: React.FC<{ item: ItemSchema }> = (props) => {
  return (
    <Paper
      component={Link}
      href={routes.item.path({ params: { itemId: props.item.id } })}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontWeight: 900,
              borderTopLeftRadius: (theme) => theme.shape.borderRadius * 3.5,
              borderTopRightRadius: (theme) => theme.shape.borderRadius * 3.5,
              width: '100%',
              color: (theme) => theme.palette.text.arcade,
              padding: (theme) => theme.spacing(0.25, 0.5),
              backgroundColor: (theme) =>
                theme.palette.background['solid-blue'],
            }}
          >
            {props.item.name}
          </Typography>
        </Box>
        <Box
          position="relative"
          minWidth={125}
          minHeight={125}
          width="100%"
          height="100%"
          maxWidth={300}
          maxHeight={300}
          sx={{ mt: 2 }}
        >
          <ContainImage src={props.item.imageUrl} alt={props.item.name} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
          }}
        >
          <Button variant="square" size="small">
            <InfoOutlined />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export const DynamicItemsScreen = dynamic(() => Promise.resolve(Screen), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
