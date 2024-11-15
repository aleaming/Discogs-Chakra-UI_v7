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
  Heading,
  Text,
  Box,
  useColorModeValue,
  ButtonGroup,
  Fade,
  Center,
  VStack,
  Icon,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import {
  ChevronDown,
  Calendar,
  Globe,
  Users,
  History,
  Ticket,
  MapPin,
} from 'lucide-react';
import { TourCard } from './TourCard';
import { TourDateRow } from './TourDateRow';
import { tours } from '../../data/tourData';
import { useState } from 'react';
import type { Tour, Performance } from './types';

type ViewMode = 'history' | 'current';

export const TourGrid = () => {
  const { colorMode } = useColorMode();
  const [viewMode, setViewMode] = useState<ViewMode>('current');
  const [sortBy, setSortBy] = useState<'date' | 'shows' | 'attendance'>('date');
  const [filterType, setFilterType] = useState<Tour['type'] | 'all'>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleViewDetails = (tour: Tour) => {
    console.log('View details for tour:', tour.id);
  };

  const handleGetTickets = (performance: Performance) => {
    if (performance.ticketUrl) {
      window.open(performance.ticketUrl, '_blank');
    } else {
      console.log('Get tickets for performance:', performance.id);
    }
  };

  // Get all unique countries from performances
  const allCountries = Array.from(
    new Set(
      tours.flatMap((tour) =>
        tour.performances.map((performance) => performance.country)
      )
    )
  ).sort();

  // Get all performances across all tours
  const allPerformances = tours
    .flatMap((tour) =>
      tour.performances.map((performance) => ({
        ...performance,
        tourName: tour.name,
      }))
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filteredTours = tours
    .filter((tour) => filterType === 'all' || tour.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case 'shows':
          return b.totalShows - a.totalShows;
        case 'attendance':
          return (b.totalAttendance || 0) - (a.totalAttendance || 0);
        default:
          return 0;
      }
    });

  const filteredPerformances = allPerformances.filter(
    (performance) =>
      filterCountry === 'all' || performance.country === filterCountry
  );

  const NoToursMessage = () => (
    <Center py={20}>
      <VStack spacing={4}>
        <Icon as={Ticket} boxSize={12} color="gray.400" />
        <Text fontSize="xl" color="gray.500">
          No current tours scheduled
        </Text>
        <Text color={textColor}>Check back later for upcoming tour dates</Text>
      </VStack>
    </Center>
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Center mb={8}>
        <ButtonGroup
          size="lg"
          isAttached
          variant="outline"
          borderRadius="full"
          borderWidth="2px"
          borderColor="brand.500"
          p={1}
          shadow="lg"
          width={{ base: 'full', md: 'auto' }}
        >
          <Button
            leftIcon={<Ticket size={20} />}
            onClick={() => setViewMode('current')}
            flex={{ base: 1, md: 'auto' }}
            px={8}
            borderRadius="full"
            colorScheme="brand"
            variant={viewMode === 'current' ? 'solid' : 'ghost'}
            transition="all 0.2s"
            _hover={{
              transform: viewMode !== 'current' ? 'translateY(-2px)' : 'none',
            }}
          >
            Current Tour
          </Button>
          <Button
            leftIcon={<History size={20} />}
            onClick={() => setViewMode('history')}
            flex={{ base: 1, md: 'auto' }}
            px={8}
            borderRadius="full"
            colorScheme="brand"
            variant={viewMode === 'history' ? 'solid' : 'ghost'}
            transition="all 0.2s"
            _hover={{
              transform: viewMode !== 'history' ? 'translateY(-2px)' : 'none',
            }}
          >
            Tour History
          </Button>
        </ButtonGroup>
      </Center>

      <Fade in={true}>
        {viewMode === 'current' ? (
          <NoToursMessage />
        ) : (
          <Tabs variant="enclosed">
            <TabList mb={4}>
              <Tab>Tour Dates</Tab>
              <Tab>Tours Overview</Tab>
            </TabList>

            <TabPanels>
              <TabPanel
                p={0}
                _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
                _light={{ bg: 'white' }}
              >
                <VStack spacing={6} align="stretch">
                  <HStack justify="space-between" wrap="wrap" spacing={4}>
                    <Box>
                      <Heading size="lg" mb={2}>
                        All Tour Dates
                      </Heading>
                      <Text color={textColor}>
                        {filteredPerformances.length} shows
                      </Text>
                    </Box>

                    <Select
                      value={filterCountry}
                      onChange={(e) => setFilterCountry(e.target.value)}
                      minW="200px"
                      icon={<MapPin />}
                    >
                      <option value="all">All Countries</option>
                      {allCountries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Select>
                  </HStack>

                  <VStack spacing={4} align="stretch">
                    {filteredPerformances.map((performance) => (
                      <TourDateRow
                        key={performance.id}
                        performance={performance}
                        onGetTickets={handleGetTickets}
                      />
                    ))}
                  </VStack>
                </VStack>
              </TabPanel>

              <TabPanel
                p={0}
                _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
                _light={{ bg: 'white' }}
              >
                <HStack mb={8} justify="space-between" wrap="wrap" spacing={4}>
                  <Box>
                    <Heading size="lg" mb={2}>
                      Tour History
                    </Heading>
                    <Text color={textColor}>
                      {filteredTours.length} tours and performances
                    </Text>
                  </Box>

                  <HStack spacing={4}>
                    <Select
                      value={filterType}
                      onChange={(e) =>
                        setFilterType(e.target.value as Tour['type'] | 'all')
                      }
                      minW="200px"
                    >
                      <option value="all">All Types</option>
                      <option value="world_tour">World Tours</option>
                      <option value="festival">Festivals</option>
                      <option value="special_event">Special Events</option>
                    </Select>

                    <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDown />}>
                        Sort by
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          icon={<Calendar size={16} />}
                          onClick={() => setSortBy('date')}
                        >
                          Date
                        </MenuItem>
                        <MenuItem
                          icon={<Globe size={16} />}
                          onClick={() => setSortBy('shows')}
                        >
                          Number of Shows
                        </MenuItem>
                        <MenuItem
                          icon={<Users size={16} />}
                          onClick={() => setSortBy('attendance')}
                        >
                          Total Attendance
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </HStack>

                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={6}
                  pb={8}
                >
                  {filteredTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Fade>
    </Container>
  );
};
