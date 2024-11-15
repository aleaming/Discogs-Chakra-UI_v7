import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  Badge,
  Icon,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MessageSquare,
  Eye,
  ThumbsUp,
  Pin,
  Lock,
} from 'lucide-react';
import type { Thread } from './types';

interface ThreadCardProps {
  thread: Thread;
  onClick: () => void;
}

export const ThreadCard = ({ thread, onClick }: ThreadCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const getCategoryColor = (category: Thread['category']) => {
    const colors = {
      general: 'gray',
      albums: 'purple',
      tours: 'green',
      news: 'blue',
      gear: 'orange',
      help: 'red',
    };
    return colors[category];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={cardBg}
      p={4}
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
      position="relative"
    >
      {thread.isPinned && (
        <Icon
          as={Pin}
          position="absolute"
          top={2}
          right={2}
          color="brand.500"
          transform="rotate(45deg)"
        />
      )}
      {thread.isLocked && (
        <Icon
          as={Lock}
          position="absolute"
          top={2}
          right={thread.isPinned ? 8 : 2}
          color="red.500"
        />
      )}

      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Badge colorScheme={getCategoryColor(thread.category)}>
            {thread.category.charAt(0).toUpperCase() + thread.category.slice(1)}
          </Badge>
          <Text fontSize="sm" color={mutedColor}>
            {formatDate(thread.createdAt)}
          </Text>
        </HStack>

        <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
          {thread.title}
        </Text>

        <Text fontSize="sm" color={mutedColor} noOfLines={2}>
          {thread.content}
        </Text>

        <Wrap spacing={2}>
          {thread.tags.map((tag) => (
            <WrapItem key={tag}>
              <Badge
                variant="subtle"
                colorScheme="gray"
                fontSize="xs"
                px={2}
                py={0.5}
                borderRadius="full"
              >
                {tag}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>

        <HStack justify="space-between" pt={2}>
          <HStack spacing={2}>
            <Avatar
              size="sm"
              name={thread.author.name}
              src={thread.author.avatar}
            />
            <VStack spacing={0} align="start">
              <Text fontSize="sm" fontWeight="medium">
                {thread.author.name}
              </Text>
              <Text fontSize="xs" color={mutedColor}>
                {thread.author.reputation} rep
              </Text>
            </VStack>
          </HStack>

          <HStack spacing={4} color={mutedColor}>
            <HStack spacing={1}>
              <MessageSquare size={16} />
              <Text fontSize="sm">{thread.commentCount}</Text>
            </HStack>
            <HStack spacing={1}>
              <Eye size={16} />
              <Text fontSize="sm">{thread.viewCount}</Text>
            </HStack>
            <HStack spacing={1}>
              <ThumbsUp size={16} />
              <Text fontSize="sm">{thread.likes}</Text>
            </HStack>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};