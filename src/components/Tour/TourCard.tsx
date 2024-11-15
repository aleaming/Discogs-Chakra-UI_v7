import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Calendar, MapPin, Users, Globe } from 'lucide-react';
import type { Tour } from './types';

interface TourCardProps {
  tour: Tour;
  onViewDetails: (tour: Tour) => void;
}

export const TourCard = ({ tour, onViewDetails }: TourCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      boxShadow="lg"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)' }}
    >
      <Box position="relative">
        <Image
          src={tour.image}
          alt={tour.name}
          height="200px"
          width="100%"
          objectFit="cover"
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={
            tour.type === 'world_tour'
              ? 'purple'
              : tour.type === 'festival'
              ? 'green'
              : 'blue'
          }
        >
          {tour.type.replace('_', ' ').toUpperCase()}
        </Badge>
      </Box>

      <VStack align="stretch" p={6} spacing={4}>
        <VStack align="start" spacing={1}>
          <Text fontSize="2xl" fontWeight="bold">
            {tour.name}
          </Text>
          <HStack color={mutedColor}>
            <Icon as={Calendar} />
            <Text>
              {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
            </Text>
          </HStack>
        </VStack>

        <Text color={mutedColor} noOfLines={2}>
          {tour.description}
        </Text>

        <VStack align="start" spacing={2}>
          <HStack>
            <Icon as={MapPin} />
            <Text>{tour.totalShows} shows</Text>
          </HStack>
          {tour.totalAttendance && (
            <HStack>
              <Icon as={Users} />
              <Text>{formatNumber(tour.totalAttendance)} attendees</Text>
            </HStack>
          )}
          <HStack>
            <Icon as={Globe} />
            <Text>{tour.countries.length} countries</Text>
          </HStack>
        </VStack>

        <Button
          colorScheme="brand"
          onClick={() => onViewDetails(tour)}
          width="full"
        >
          View Details
        </Button>
      </VStack>
    </Box>
  );
};