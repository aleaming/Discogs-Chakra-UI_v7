import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { Search, ChevronDown, TrendingUp, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import { FilterDrawer } from '../FilterDrawer';
import { FilterChips } from './FilterChips';
import { GridView } from '../MarketplaceGrid/GridView';
import { top100Items } from '../../data/marketplaceTop100';
import type { Filter, FilterState, MarketplaceAllProps } from './types';
import { marketplaceStats } from '../../data/marketplaceStats';

export const MarketplaceAll = ({ onViewDetails, onAddToCart }: MarketplaceAllProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState<FilterState>({
    format: [],
    condition: [],
    price: [0, 1000],
    location: [],
    sellerRating: 0,
    year: [1950, 2024],
    search: '',
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchQuery }));
  };

  const handleRemoveFilter = (filterToRemove: Filter) => {
    setActiveFilters(prev => prev.filter(f => 
      !(f.category === filterToRemove.category && f.value === filterToRemove.value)
    ));
    
    // Update the filter state based on the removed filter
    setFilters(prev => {
      const newState = { ...prev };
      switch (filterToRemove.category) {
        case 'Format':
          newState.format = prev.format.filter(f => f !== filterToRemove.value);
          break;
        case 'Condition':
          newState.condition = prev.condition.filter(c => c !== filterToRemove.value);
          break;
        case 'Location':
          newState.location = prev.location.filter(l => l !== filterToRemove.value);
          break;
        // Add other cases as needed
      }
      return newState;
    });
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setFilters({
      format: [],
      condition: [],
      price: [0, 1000],
      location: [],
      sellerRating: 0,
      year: [1950, 2024],
      search: '',
    });
  };

  // Apply filters to items
  const filteredItems = top100Items.filter(item => {
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.format.length && !filters.format.includes(item.format.type)) {
      return false;
    }
    if (filters.condition.length && !filters.condition.includes(item.condition.media)) {
      return false;
    }
    if (filters.location.length && !filters.location.includes(item.shipping.from)) {
      return false;
    }
    const price = parseFloat(item.price);
    if (price < filters.price[0] || price > filters.price[1]) {
      return false;
    }
    return true;
  });

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Heading size="lg" mb={2}>Marketplace</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              {marketplaceStats.totalItems.toLocaleString()} items available
            </Text>
          </Box>
          <HStack spacing={4}>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
              <InputGroup maxW="400px">
                <InputLeftElement>
                  <Search size={20} />
                </InputLeftElement>
                <Input
                  placeholder="Search marketplace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </form>

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDown />}>
                Sort by
              </MenuButton>
              <MenuList>
                <MenuItem icon={<TrendingUp size={16} />} onClick={() => setSortBy('popular')}>
                  Most Popular
                </MenuItem>
                <MenuItem icon={<Clock size={16} />} onClick={() => setSortBy('recent')}>
                  Recently Added
                </MenuItem>
                <MenuItem icon={<Star size={16} />} onClick={() => setSortBy('rating')}>
                  Top Rated
                </MenuItem>
              </MenuList>
            </Menu>

            <FilterDrawer
              onApplyFilters={(newFilters) => {
                setActiveFilters(newFilters);
                setFilters(prev => ({
                  ...prev,
                  format: newFilters
                    .filter(f => f.category === 'Format')
                    .map(f => f.value),
                  condition: newFilters
                    .filter(f => f.category === 'Condition')
                    .map(f => f.value),
                  location: newFilters
                    .filter(f => f.category === 'Location')
                    .map(f => f.value),
                  price: newFilters
                    .find(f => f.category === 'Price')
                    ?.value.split(' - ')
                    .map(v => parseInt(v.replace('$', ''))) as [number, number] || [0, 1000],
                  year: newFilters
                    .find(f => f.category === 'Year')
                    ?.value.split(' - ')
                    .map(v => parseInt(v)) as [number, number] || [1950, 2024],
                }));
              }}
              initialFilters={filters}
            />
          </HStack>
        </HStack>

        <FilterChips
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        <Box>
          <GridView
            items={filteredItems}
            onViewDetails={onViewDetails || (() => {})}
            isCarousel={false}
          />
        </Box>
      </VStack>
    </Container>
  );
};