import {
  HStack,
  VStack,
  Text,
  Badge,
  Button,
  Box,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import type { Performance } from './types';

interface TourDateRowProps {
  performance: Performance;
  onGetTickets: (performance: Performance) => void;
}

export const TourDateRow = ({ performance, onGetTickets }: TourDateRowProps) => {
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      year: d.getFullYear(),
      time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
  };

  const dateInfo = formatDate(performance.date);

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={4}
      transition="all 0.2s"
      _hover={{ bg: hoverBg }}
    >
      <HStack spacing={6} align="center">
        <VStack spacing={0} align="center" minW="100px">
          <Text fontSize="sm" color={mutedColor}>
            {dateInfo.day}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {dateInfo.date}
          </Text>
          <Text fontSize="sm" color={mutedColor}>
            {dateInfo.year}
          </Text>
        </VStack>

        <Divider orientation="vertical" height="50px" />

        <VStack align="start" flex={1} spacing={1}>
          <Text fontSize="lg" fontWeight="semibold">
            {performance.venue}
          </Text>
          <HStack color={mutedColor} fontSize="sm">
            <MapPin size={16} />
            <Text>
              {performance.city}, {performance.country}
            </Text>
          </HStack>
        </VStack>

        <VStack align="end" spacing={2}>
          <HStack>
            <Clock size={16} />
            <Text color={mutedColor}>{dateInfo.time}</Text>
          </HStack>
          {performance.status && (
            <Badge
              colorScheme={
                performance.status === 'sold_out'
                  ? 'red'
                  : performance.status === 'limited'
                  ? 'yellow'
                  : 'green'
              }
            >
              {performance.status === 'sold_out'
                ? 'Sold Out'
                : performance.status === 'limited'
                ? 'Limited Tickets'
                : 'Available'}
            </Badge>
          )}
        </VStack>

        <Button
          colorScheme="brand"
          onClick={() => onGetTickets(performance)}
          isDisabled={performance.status === 'sold_out'}
        >
          {performance.status === 'sold_out' ? 'Sold Out' : 'Get Tickets'}
        </Button>
      </HStack>
    </Box>
  );
};