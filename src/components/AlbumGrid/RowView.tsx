import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Heart, MoreHorizontal, Share2 } from 'lucide-react';
import { Album } from '../../data/discography';

interface RowViewProps {
  albums: Album[];
  onViewVersions: (album: Album) => void;
}

export const RowView = ({ albums, onViewVersions }: RowViewProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={2} align="stretch">
      {albums.map((album) => (
        <Box
          key={album.id}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={2}
          _hover={{ bg: menuBgColor }}
          transition="all 0.2s"
          bg={bgColor}
        >
          <HStack spacing={6}>
            <Image
              src={album.artwork}
              alt={album.title}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
            <VStack align="start" flex={1} spacing={2}>
              <Text fontSize="xl" fontWeight="bold" color={colorInvert}>
                {album.title}
              </Text>
              <HStack spacing={4}>
                <Text color={mutedColor}>{album.releaseYear}</Text>
                <Badge colorScheme="purple">{album.versions} versions</Badge>
                <Badge colorScheme="green">
                  Rating: {album.rating.toFixed(1)}
                </Badge>
              </HStack>
              <Text color={mutedColor} fontSize="sm">
                Formats: {album.formats.join(', ')}
              </Text>
            </VStack>
            <HStack spacing={2}>
              <Button
                size="sm"
                colorScheme="brand"
                onClick={() => onViewVersions(album)}
              >
                View Versions
              </Button>
              <IconButton
                aria-label="Add to wantlist"
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
                <MenuList>
                  <MenuItem icon={<Share2 size={16} />}>Share</MenuItem>
                  <MenuItem>Add to List</MenuItem>
                  <MenuItem>View Details</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};