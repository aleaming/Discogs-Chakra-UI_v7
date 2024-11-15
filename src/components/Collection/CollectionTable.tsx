import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { Edit, Trash2, Share2, Heart, MoreHorizontal } from 'lucide-react';
import type { CollectionItem } from './types';
import { AlbumCover } from '../Image/AlbumCover';
import { Pagination } from './Pagination';
import { usePagination } from '../../hooks/usePagination';

interface CollectionTableProps {
  items: CollectionItem[];
  onEdit: (item: CollectionItem) => void;
}

export const CollectionTable = ({ items, onEdit }: CollectionTableProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const {
    currentPage,
    itemsPerPage,
    paginatedItems,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(items);

  return (
    <Box>
      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>Cover</Th>
              <Th borderColor={borderColor}>Title</Th>
              <Th borderColor={borderColor}>Artist</Th>
              <Th borderColor={borderColor}>Format</Th>
              <Th borderColor={borderColor}>Condition</Th>
              <Th borderColor={borderColor}>Added</Th>
              <Th borderColor={borderColor} isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedItems.map((item) => (
              <Tr 
                key={item.id}
                _hover={{ bg: menuBgColor }}
                transition="background-color 0.2s"
              >
                <Td borderColor={borderColor}>
                  <AlbumCover
                    src={item.image}
                    alt={`${item.title} by ${item.artist}`}
                    title={item.title}
                    artist={item.artist}
                    size="sm"
                    variant="vinyl"
                    boxSize="48px"
                  />
                </Td>
                <Td borderColor={borderColor}>
                  <Text fontWeight="medium" color={colorInvert}>
                    {item.title}
                  </Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text color="brand.500">{item.artist}</Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text>{item.format.type}</Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text>M: {item.condition.media} / S: {item.condition.sleeve}</Text>
                </Td>
                <Td borderColor={borderColor}>
                  <Text color={mutedColor}>
                    {new Date(item.dateAdded).toLocaleDateString()}
                  </Text>
                </Td>
                <Td borderColor={borderColor} isNumeric>
                  <HStack spacing={2} justify="flex-end">
                    <IconButton
                      aria-label="Edit item"
                      icon={<Edit size={16} />}
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(item)}
                      _hover={{ bg: menuBgColor }}
                    />
                    <IconButton
                      aria-label="Add to favorites"
                      icon={<Heart size={16} />}
                      size="sm"
                      variant="ghost"
                      _hover={{ bg: menuBgColor }}
                    />
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="More options"
                        icon={<MoreHorizontal size={16} />}
                        size="sm"
                        variant="ghost"
                        _hover={{ bg: menuBgColor }}
                      />
                      <MenuList bg={bgColor} borderColor={borderColor}>
                        <MenuItem
                          icon={<Edit size={16} />}
                          onClick={() => onEdit(item)}
                          _hover={{ bg: menuBgColor }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<Share2 size={16} />}
                          _hover={{ bg: menuBgColor }}
                        >
                          Share
                        </MenuItem>
                        <MenuItem
                          icon={<Trash2 size={16} />}
                          color="red.500"
                          _hover={{ bg: menuBgColor }}
                        >
                          Remove
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </Box>
  );
};