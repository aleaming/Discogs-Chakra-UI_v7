import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  useColorModeValue,
  AspectRatio,
} from '@chakra-ui/react';
import { Play, Clock, Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import type { Video } from './types';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export const VideoCard = ({ video, onClick }: VideoCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeColor = (type: Video['type']) => {
    const colors = {
      music_video: 'purple',
      live: 'red',
      interview: 'blue',
      documentary: 'green',
      behind_scenes: 'orange',
    };
    return colors[type];
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Box position="relative">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={video.thumbnail}
            alt={video.title}
            objectFit="cover"
          />
        </AspectRatio>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.400"
          opacity={0}
          transition="opacity 0.2s"
          _groupHover={{ opacity: 1 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={Play} boxSize={12} color="white" />
        </Box>
        <Badge
          position="absolute"
          bottom={2}
          right={2}
          colorScheme="blackAlpha"
          bg="blackAlpha.700"
          color="white"
        >
          {video.duration}
        </Badge>
      </Box>

      <VStack align="stretch" p={4} spacing={2}>
        <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
          {video.title}
        </Text>

        <HStack>
          <Badge colorScheme={getTypeColor(video.type)}>
            {video.type.replace('_', ' ').toUpperCase()}
          </Badge>
          <Text fontSize="sm" color={mutedColor}>
            {formatDate(video.uploadDate)}
          </Text>
        </HStack>

        <Text fontSize="sm" color={mutedColor} noOfLines={2}>
          {video.description}
        </Text>

        <HStack spacing={4} color={mutedColor} fontSize="sm">
          <HStack>
            <Eye size={16} />
            <Text>{formatViews(video.views)} views</Text>
          </HStack>
          {video.likes && (
            <HStack>
              <ThumbsUp size={16} />
              <Text>{formatViews(video.likes)}</Text>
            </HStack>
          )}
          {video.comments && (
            <HStack>
              <MessageCircle size={16} />
              <Text>{formatViews(video.comments)}</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};