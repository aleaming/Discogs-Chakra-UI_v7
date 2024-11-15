import {
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
  Wrap,
  WrapItem,
  Text,
  Box,
} from '@chakra-ui/react';
import { X } from 'lucide-react';
import type { Filter } from './types';

interface FilterChipsProps {
  activeFilters: Filter[];
  onRemoveFilter: (filter: Filter) => void;
  onClearAll: () => void;
}

export const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }: FilterChipsProps) => {
  if (activeFilters.length === 0) return null;

  const groupedFilters = activeFilters.reduce((acc, filter) => {
    if (!acc[filter.category]) {
      acc[filter.category] = [];
    }
    acc[filter.category].push(filter);
    return acc;
  }, {} as Record<string, Filter[]>);

  return (
    <Box py={4}>
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="medium">Active Filters:</Text>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<X size={14} />}
          onClick={onClearAll}
        >
          Clear All
        </Button>
      </HStack>
      <Wrap spacing={2}>
        {Object.entries(groupedFilters).map(([category, filters]) => (
          <WrapItem key={category}>
            <HStack spacing={1}>
              <Text fontSize="xs" color="gray.500" fontWeight="medium">
                {category}:
              </Text>
              {filters.map((filter) => (
                <Tag
                  key={`${filter.category}-${filter.value}`}
                  size="md"
                  borderRadius="full"
                  variant="subtle"
                  colorScheme="brand"
                >
                  <TagLabel>{filter.value}</TagLabel>
                  <TagCloseButton onClick={() => onRemoveFilter(filter)} />
                </Tag>
              ))}
            </HStack>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};