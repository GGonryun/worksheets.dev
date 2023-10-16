import { Box, Divider } from '@mui/material';
import { FC, useState } from 'react';
import { GalleryHeader } from './Header';
import { usePlayer } from '../../hooks/usePlayer';
import { useRouter } from 'next/router';
import { urls } from '../../util/urls';
import { DetailsModal } from '../DetailsModal';
import { InfoModal } from './InfoModal';
import { Layout } from './Layout';
import { ImageCard, LevelsCard } from './Cards';

export const Page: FC = () => {
  const player = usePlayer();
  const { push } = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const [showDetails, setShowDetails] = useState('');

  return (
    <>
      <Layout>
        <GalleryHeader
          onHome={() => push(urls.home())}
          onInfo={() => setShowInfo(true)}
        />
        <Box py={1}>
          <Divider sx={{ backgroundColor: 'white' }} />
        </Box>
        <Box
          overflow="auto"
          maxHeight={'85%'}
          p={1}
          display="flex"
          flexWrap={'wrap'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {player.completed.map((id) => (
            <ImageCard key={id} id={id} onClick={() => setShowDetails(id)} />
          ))}

          <LevelsCard onClick={() => push(urls.levels())} />
        </Box>
      </Layout>
      <DetailsModal
        id={showDetails}
        onClose={() => setShowDetails('')}
        onView={() => {
          push(urls.puzzle(showDetails));
        }}
      />
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
};
