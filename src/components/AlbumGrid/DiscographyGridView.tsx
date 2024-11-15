import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Divider,
  useDisclosure,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { VersionsModal } from '../VersionsModal';
import { discography, Album } from '../../data/discography';
import { GridView } from './GridView';
import { RowView } from './RowView';
import { TableView } from './TableView';
import { LayoutSwitcher, LayoutType } from './LayoutSwitcher';

export const DiscographyGridView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [layout, setLayout] = useState<LayoutType>('grid');

  const handleViewVersions = (album: Album) => {
    setSelectedAlbum(album);
    onOpen();
  };

  const renderContent = (title: string, albums: Album[]) => {
    const ViewComponent = {
      grid: GridView,
      row: RowView,
      table: TableView,
    }[layout];

    return (
      <Box mb={8}>
        <HStack mb={6}>
          <Heading size="lg">{title}</Heading>
          <Spacer />
          {title === 'Studio Albums' && (
            <LayoutSwitcher
              currentLayout={layout}
              onLayoutChange={setLayout}
            />
          )}
        </HStack>
        <Divider mb={6} />
        <ViewComponent albums={albums} onViewVersions={handleViewVersions} />
      </Box>
    );
  };

  return (
    <Container maxW="container.xl" py={8}>
      {renderContent('Studio Albums', discography.filter(album => album.type === 'album'))}
      {renderContent('Singles & EPs', discography.filter(album => album.type === 'single'))}
      {renderContent('Live Albums & Compilations', discography.filter(album => album.type === 'compilation'))}
      {renderContent('Videos', discography.filter(album => album.type === 'video'))}

      {selectedAlbum && (
        <VersionsModal
          isOpen={isOpen}
          onClose={onClose}
          album={{
            title: selectedAlbum.title,
            artwork: selectedAlbum.artwork,
            versions: selectedAlbum.versionsList,
          }}
        />
      )}
    </Container>
  );
};