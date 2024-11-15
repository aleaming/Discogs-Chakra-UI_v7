import {
  Container,
  SimpleGrid,
  HStack,
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Heading,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDown, TrendingUp, Clock, Eye } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';
import { videos } from '../../data/videosData';
import { useState } from 'react';
import type { Video } from './types';

export const VideosGrid = () => {
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'likes'>('recent');
  const [filterType, setFilterType] = useState<Video['type'] | 'all'>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    onOpen();
  };

  const filteredVideos = videos
    .filter((video) => filterType === 'all' || video.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'views':
          return b.views - a.views;
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        default:
          return 0;
      }
    });

  return (
    <Container maxW="container.xl" py={8}>
      <HStack mb={8} justify="space-between" wrap="wrap" spacing={4}>
        <Box>
          <Heading size="lg" mb={2}>Videos</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            {filteredVideos.length} videos available
          </Text>
        </Box>

        <HStack spacing={4}>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as Video['type'] | 'all')}
            minW="200px"
          >
            <option value="all">All Types</option>
            <option value="music_video">Music Videos</option>
            <option value="live">Live Performances</option>
            <option value="interview">Interviews</option>
            <option value="documentary">Documentaries</option>
            <option value="behind_scenes">Behind the Scenes</option>
          </Select>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDown />}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<Clock size={16} />}
                onClick={() => setSortBy('recent')}
              >
                Most Recent
              </MenuItem>
              <MenuItem
                icon={<Eye size={16} />}
                onClick={() => setSortBy('views')}
              >
                Most Viewed
              </MenuItem>
              <MenuItem
                icon={<TrendingUp size={16} />}
                onClick={() => setSortBy('likes')}
              >
                Most Liked
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        pb={8}
      >
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => handleVideoClick(video)}
          />
        ))}
      </SimpleGrid>

      <VideoModal
        isOpen={isOpen}
        onClose={onClose}
        video={selectedVideo}
      />
    </Container>
  );
};