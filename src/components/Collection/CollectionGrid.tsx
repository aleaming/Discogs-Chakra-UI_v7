import {
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { Edit, Trash2, Share2, Heart, MoreHorizontal } from 'lucide-react';
import type { CollectionItem } from './types';
import { AlbumCover } from '../Image/AlbumCover';
import { Pagination } from './Pagination';
import { usePagination } from '../../hooks/usePagination';

interface CollectionGridProps {
  items: CollectionItem[];
  onEdit: (item: CollectionItem) => void;
}

export const CollectionGrid = ({ items, onEdit }: CollectionGridProps) => {
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
    <VStack spacing={6} align="stretch">
      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
        {paginatedItems.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            overflow="hidden"
            bg={bgColor}
            transition="all 0.2s"
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
          >
            <AlbumCover
              src={item.image}
              alt={`${item.title} by ${item.artist}`}
              title={item.title}
              artist={item.artist}
              size="md"
              variant="vinyl"
              width="100%"
              height="auto"
              aspectRatio={1}
            />

            <VStack p={4} align="stretch" spacing={3}>
              <VStack align="start" spacing={1}>
                <Box fontSize="lg" fontWeight="bold" color={colorInvert}>
                  {item.title}
                </Box>
                <Box fontSize="md" color="brand.500">
                  {item.artist}
                </Box>
              </VStack>

              <HStack>
                <Badge colorScheme="purple">{item.format.type}</Badge>
                <Badge variant="outline">{item.releaseYear}</Badge>
              </HStack>

              <HStack spacing={2}>
                <Badge variant="mint">
                  Media: {item.condition.media}
                </Badge>
                <Badge variant="nearMint">
                  Sleeve: {item.condition.sleeve}
                </Badge>
              </HStack>

              {item.condition.notes && (
                <Box fontSize="sm" color={mutedColor} noOfLines={2}>
                  {item.condition.notes}
                </Box>
              )}

              <HStack justify="space-between" pt={2}>
                <HStack spacing={2}>
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
                  <IconButton
                    aria-label="Share"
                    icon={<Share2 size={16} />}
                    size="sm"
                    variant="ghost"
                    _hover={{ bg: menuBgColor }}
                  />
                </HStack>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="More options"
                    icon={<MoreHorizontal size={16} />}
                    size="sm"
                    variant="ghost"
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
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </VStack>
  );
};