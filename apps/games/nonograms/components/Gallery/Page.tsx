import { Box, Divider } from '@mui/material';
import { FC, useState } from 'react';
import { GalleryHeader } from './Header';
import { usePlayer } from '../../hooks/usePlayer';
import { useRouter } from 'next/router';
import { DetailsModal } from '../DetailsModal';
import { InfoModal } from './InfoModal';
import { Layout } from './Layout';
import { ImageCard, LevelsCard } from './Cards';
import { urls } from '@worksheets/ui-games';

export const Page: FC = () => {
  const player = usePlayer();
  const { push } = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const [showDetails, setShowDetails] = useState('');

  return (
    <>
      <Layout>
        <GalleryHeader
          onHome={() => push(urls.relative.home)}
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

          <LevelsCard onClick={() => push(urls.relative.levels)} />
        </Box>
      </Layout>
      <DetailsModal
        id={showDetails}
        onClose={() => setShowDetails('')}
        onView={() => {
          push(`${urls.relative.puzzle}?id=${showDetails}`);
        }}
      />
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
};
