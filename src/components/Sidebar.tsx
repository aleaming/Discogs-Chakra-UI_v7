// src/components/Sidebar.tsx
import {
  Box,
  VStack,
  Heading,
  Checkbox,
  CheckboxGroup,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

type SidebarProps = {
  onFilterChange: (selectedFilters: string[]) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
    onFilterChange(filters);
  };

  return (
    <Box
      as="aside"
      width="250px"
      p={4}
      bg="gray.100"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading size="md" mb={4}>
        Filters
      </Heading>
      <CheckboxGroup
        colorScheme="teal"
        value={selectedFilters}
        onChange={(filters) => handleFilterChange(filters as string[])}
      >
        <VStack align="start">
          <Checkbox value="Electronic">Electronic</Checkbox>
          <Checkbox value="Pop">Pop</Checkbox>
          <Checkbox value="Rock">Rock</Checkbox>
          <Checkbox value="Jazz">Jazz</Checkbox>
          <Checkbox value="Classical">Classical</Checkbox>
        </VStack>
      </CheckboxGroup>
    </Box>
  );
};

export default Sidebar;
