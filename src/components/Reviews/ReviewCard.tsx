import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  Badge,
  Icon,
  Button,
  Image,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { Star, ThumbsUp, Calendar } from 'lucide-react';
import type { Review } from './types';
import { useMemo } from 'react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const anonymousId = useMemo(() => {
    if (!review.user.isDeleted) return null;
    // Generate deterministic anonymous ID based on review ID
    return `User${parseInt(review.id, 16) % 100000}`;
  }, [review.id, review.user.isDeleted]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={cardBg}
      p={6}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
    >
      <VStack align="stretch" spacing={4}>
        <HStack spacing={4}>
          <Avatar
            size="md"
            name={review.user.isDeleted ? anonymousId : review.user.name}
            src={review.user.isDeleted ? undefined : review.user.avatar}
            bg={review.user.isDeleted ? 'gray.400' : undefined}
          />
          <VStack align="start" spacing={0} flex={1}>
            <HStack>
              <Text fontWeight="bold">
                {review.user.isDeleted ? anonymousId : review.user.name}
              </Text>
              {review.verified && (
                <Badge colorScheme="green" fontSize="xs">
                  Verified Purchase
                </Badge>
              )}
              {review.user.isDeleted && (
                <Badge colorScheme="gray" fontSize="xs">
                  Account Deleted
                </Badge>
              )}
            </HStack>
            {!review.user.isDeleted && review.user.totalReviews && (
              <Text fontSize="sm" color={mutedColor}>
                {review.user.totalReviews} reviews
              </Text>
            )}
          </VStack>
          <Badge
            colorScheme={
              review.type === 'purchase'
                ? 'green'
                : review.type === 'collection'
                ? 'purple'
                : 'blue'
            }
          >
            {review.type.charAt(0).toUpperCase() + review.type.slice(1)}
          </Badge>
        </HStack>

        <VStack align="start" spacing={2}>
          <HStack>
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                as={Star}
                color={i < review.rating ? 'yellow.400' : 'gray.300'}
                fill={i < review.rating ? 'yellow.400' : 'none'}
              />
            ))}
          </HStack>
          <Text fontSize="lg" fontWeight="bold">
            {review.title}
          </Text>
          <Text color={mutedColor}>{review.content}</Text>
        </VStack>

        {review.images && review.images.length > 0 && (
          <Wrap spacing={2}>
            {review.images.map((image, index) => (
              <WrapItem key={index}>
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </WrapItem>
            ))}
          </Wrap>
        )}

        <HStack justify="space-between" pt={2}>
          <HStack spacing={4} color={mutedColor} fontSize="sm">
            <HStack>
              <Calendar size={16} />
              <Text>{formatDate(review.date)}</Text>
            </HStack>
            <HStack>
              <ThumbsUp size={16} />
              <Text>
                {review.helpfulVotes} of {review.totalVotes} found helpful
              </Text>
            </HStack>
          </HStack>
          <Button size="sm" leftIcon={<ThumbsUp size={16} />} variant="ghost">
            Helpful
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};