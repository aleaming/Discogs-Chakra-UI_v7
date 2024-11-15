import {
  Box,
  Container,
  SimpleGrid,
  HStack,
  Select,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Heading,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDown, Star, TrendingUp, Clock, ThumbsUp } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import { reviews } from '../../data/reviewsData';
import { useState } from 'react';

export const ReviewsGrid = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterType, setFilterType] = useState('all');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const calculateAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = Array(5).fill(0);
    reviews.forEach((review) => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse();
  };

  const filteredReviews = reviews
    .filter((review) => filterType === 'all' || review.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'helpful':
          return b.helpfulVotes - a.helpfulVotes;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={8}>
        <VStack
          align="stretch"
          spacing={6}
          position="sticky"
          top={4}
          height="fit-content"
        >
          <Box
            p={6}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
          >
            <VStack align="stretch" spacing={4}>
              <Stat>
                <StatLabel fontSize="lg">Average Rating</StatLabel>
                <StatNumber fontSize="4xl">{calculateAverageRating()}</StatNumber>
                <StatHelpText>
                  Based on {reviews.length} reviews
                </StatHelpText>
              </Stat>

              <Box>
                {getRatingDistribution().map((count, index) => {
                  const rating = 5 - index;
                  const percentage = (count / reviews.length) * 100;
                  return (
                    <HStack key={rating} spacing={3} mb={2}>
                      <Text fontSize="sm" minW="60px">
                        {rating} stars
                      </Text>
                      <Progress
                        value={percentage}
                        size="sm"
                        colorScheme="yellow"
                        flex={1}
                      />
                      <Text fontSize="sm" minW="40px">
                        {count}
                      </Text>
                    </HStack>
                  );
                })}
              </Box>
            </VStack>
          </Box>

          <Box
            p={6}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
          >
            <VStack align="stretch" spacing={4}>
              <Heading size="sm">Filter Reviews</Heading>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Reviews</option>
                <option value="purchase">Verified Purchases</option>
                <option value="collection">Collection Reviews</option>
                <option value="community">Community Reviews</option>
              </Select>
            </VStack>
          </Box>
        </VStack>

        <Box gridColumn="2 / -1">
          <VStack align="stretch" spacing={6}>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="medium">
                {filteredReviews.length} reviews
              </Text>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDown />} variant="outline">
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
                    icon={<ThumbsUp size={16} />}
                    onClick={() => setSortBy('helpful')}
                  >
                    Most Helpful
                  </MenuItem>
                  <MenuItem
                    icon={<Star size={16} />}
                    onClick={() => setSortBy('rating')}
                  >
                    Highest Rated
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <SimpleGrid columns={1} spacing={6}>
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
};