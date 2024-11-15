import {
  Box,
  SimpleGrid,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  IconButton,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Info, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import type { CollectionItem } from './types';
import { AlbumCover } from '../Image/AlbumCover';
import { Pagination } from './Pagination';
import { usePagination } from '../../hooks/usePagination';

interface RecordCrateViewProps {
  items: CollectionItem[];
  onSelect: (item: CollectionItem) => void;
  onEdit: (item: CollectionItem) => void;
}

export const RecordCrateView = ({ items, onSelect, onEdit }: RecordCrateViewProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');

  const {
    currentPage,
    itemsPerPage,
    paginatedItems,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(items);

  const MotionBox = motion(Box);

  return (
    <VStack spacing={6} align="stretch">
      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <Flex 
        wrap="wrap" 
        gap={8} 
        justify="center"
        p={8}
        bg={useColorModeValue('gray.50', 'gray.900')}
        borderRadius="xl"
        boxShadow="inner"
        minH="600px"
        sx={{ perspective: '2000px' }}
      >
        {paginatedItems.map((item) => (
          <MotionBox
            key={item.id}
            position="relative"
            width="300px"
            height="300px"
            sx={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
            initial={false}
          >
            <AnimatePresence initial={false} mode="wait">
              <MotionBox
                position="absolute"
                width="100%"
                height="100%"
                sx={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  rotateY: 180,
                  transition: { duration: 0.6 }
                }}
              >
                {/* Front Side */}
                <MotionBox
                  position="absolute"
                  width="100%"
                  height="100%"
                  borderRadius="lg"
                  overflow="hidden"
                  sx={{ backfaceVisibility: 'hidden' }}
                  boxShadow={`
                    0 20px 25px -5px ${shadowColor},
                    0 8px 10px -6px ${shadowColor}
                  `}
                  bg={bgColor}
                >
                  <AlbumCover
                    src={item.image}
                    alt={`${item.title} by ${item.artist}`}
                    title={item.title}
                    artist={item.artist}
                    size="lg"
                    variant="vinyl"
                    width="100%"
                    height="100%"
                  />
                  
                  {/* Record Spine Effect */}
                  <Box
                    position="absolute"
                    right="-10px"
                    top="0"
                    bottom="0"
                    width="20px"
                    bg={bgColor}
                    borderRightRadius="md"
                    sx={{ 
                      transform: 'rotateY(90deg)',
                      transformOrigin: 'left',
                    }}
                    boxShadow={`inset -2px 0 5px ${shadowColor}`}
                  />
                </MotionBox>

                {/* Back Side */}
                <MotionBox
                  position="absolute"
                  width="100%"
                  height="100%"
                  borderRadius="lg"
                  overflow="hidden"
                  sx={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  bg={bgColor}
                  p={4}
                  boxShadow={`
                    0 20px 25px -5px ${shadowColor},
                    0 8px 10px -6px ${shadowColor}
                  `}
                >
                  <VStack height="100%" spacing={4} align="stretch">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xl" fontWeight="bold" color={colorInvert}>
                        {item.title}
                      </Text>
                      <Text fontSize="md" color="brand.500">
                        {item.artist}
                      </Text>
                    </VStack>

                    <VStack align="start" spacing={2}>
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
                        <Text fontSize="sm" color={mutedColor} noOfLines={2}>
                          {item.condition.notes}
                        </Text>
                      )}
                    </VStack>

                    <Spacer />

                    <HStack spacing={2} mt="auto">
                      <Button
                        size="sm"
                        colorScheme="brand"
                        width="full"
                        onClick={() => onSelect(item)}
                      >
                        View Details
                      </Button>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(item);
                            }}
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
                </MotionBox>
              </MotionBox>
            </AnimatePresence>
          </MotionBox>
        ))}
      </Flex>

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