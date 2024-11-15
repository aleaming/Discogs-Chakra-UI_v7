import {
  VStack,
  HStack,
  Text,
  Box,
  IconButton,
  Button,
  Badge,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { MoreVertical, Search, Bell, Mail, Edit, Trash2 } from 'lucide-react';
import { SavedSearch } from './types';
import { SaveSearchModal } from './SaveSearchModal';
import { useState } from 'react';

interface SavedSearchesProps {
  searches: SavedSearch[];
}

export const SavedSearches = ({ searches }: SavedSearchesProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSearch, setSelectedSearch] = useState<SavedSearch | null>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const handleEdit = (search: SavedSearch) => {
    setSelectedSearch(search);
    onOpen();
  };

  const handleNewSearch = () => {
    setSelectedSearch(null);
    onOpen();
  };

  if (searches.length === 0) {
    return (
      <VStack spacing={4} align="center" py={8}>
        <Search size={40} color={mutedColor} />
        <Text color={mutedColor}>No saved searches yet</Text>
        <Button
          leftIcon={<Search size={16} />}
          colorScheme="brand"
          onClick={handleNewSearch}
        >
          Create Search Alert
        </Button>
      </VStack>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Text fontWeight="medium">Saved Searches</Text>
        <Button
          leftIcon={<Search size={16} />}
          size="sm"
          colorScheme="brand"
          onClick={handleNewSearch}
        >
          New Search
        </Button>
      </HStack>

      {searches.map((search) => (
        <Box
          key={search.id}
          p={4}
          borderRadius="md"
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          _hover={{ bg: hoverBg }}
        >
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <HStack>
                <Search size={16} />
                <Text fontWeight="medium">{search.name}</Text>
              </HStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MoreVertical size={16} />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem
                    icon={<Edit size={16} />}
                    onClick={() => handleEdit(search)}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem icon={<Trash2 size={16} />} color="red.500">
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <Box fontSize="sm" color={mutedColor}>
              <Text>
                {Object.entries(search.criteria)
                  .filter(([_, value]) => value !== undefined)
                  .map(([key, value]) => {
                    if (Array.isArray(value)) {
                      if (value.length === 2 && typeof value[0] === 'number') {
                        return `${key}: ${value[0]} - ${value[1]}`;
                      }
                      return `${key}: ${value.join(', ')}`;
                    }
                    return `${key}: ${value}`;
                  })
                  .join(' • ')}
              </Text>
            </Box>

            <HStack justify="space-between">
              <Text fontSize="xs" color={mutedColor}>
                Last checked:{' '}
                {search.lastChecked
                  ? new Date(search.lastChecked).toLocaleString()
                  : 'Never'}
              </Text>
              <HStack spacing={4}>
                <HStack>
                  <Bell size={16} />
                  <Switch
                    size="sm"
                    isChecked={search.notificationEnabled}
                    colorScheme="brand"
                  />
                </HStack>
                <HStack>
                  <Mail size={16} />
                  <Switch
                    size="sm"
                    isChecked={search.emailEnabled}
                    colorScheme="brand"
                  />
                </HStack>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      ))}

      <SaveSearchModal
        isOpen={isOpen}
        onClose={onClose}
        savedSearch={selectedSearch}
      />
    </VStack>
  );
};