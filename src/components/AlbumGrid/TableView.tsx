import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
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
import { ChevronDown, ChevronUp, MoreHorizontal, Heart, Share2 } from 'lucide-react';
import { Album } from '../../data/discography';
import { useState } from 'react';

interface TableViewProps {
  albums: Album[];
  onViewVersions: (album: Album) => void;
}

type SortField = 'title' | 'releaseYear' | 'rating' | 'versions';
type SortDirection = 'asc' | 'desc';

export const TableView = ({ albums, onViewVersions }: TableViewProps) => {
  const [sortField, setSortField] = useState<SortField>('releaseYear');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAlbums = [...albums].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return fieldA.localeCompare(fieldB) * modifier;
    }
    return ((fieldA as number) - (fieldB as number)) * modifier;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Cover</Th>
            <Th onClick={() => handleSort('title')} cursor="pointer">
              <HStack spacing={1}>
                <Text>Title</Text>
                <SortIcon field="title" />
              </HStack>
            </Th>
            <Th onClick={() => handleSort('releaseYear')} cursor="pointer">
              <HStack spacing={1}>
                <Text>Year</Text>
                <SortIcon field="releaseYear" />
              </HStack>
            </Th>
            <Th onClick={() => handleSort('rating')} cursor="pointer">
              <HStack spacing={1}>
                <Text>Rating</Text>
                <SortIcon field="rating" />
              </HStack>
            </Th>
            <Th onClick={() => handleSort('versions')} cursor="pointer">
              <HStack spacing={1}>
                <Text>Versions</Text>
                <SortIcon field="versions" />
              </HStack>
            </Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedAlbums.map((album) => (
            <Tr
              key={album.id}
              _hover={{ bg: hoverBg }}
              cursor="pointer"
              onClick={() => onViewVersions(album)}
            >
              <Td>
                <Image
                  src={album.artwork}
                  alt={album.title}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Td>
              <Td fontWeight="medium">{album.title}</Td>
              <Td>{album.releaseYear}</Td>
              <Td>{album.rating.toFixed(1)}</Td>
              <Td>{album.versions}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Add to wantlist"
                    icon={<Heart size={16} />}
                    size="sm"
                    variant="ghost"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="More options"
                      icon={<MoreHorizontal size={16} />}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <MenuList>
                      <MenuItem icon={<Share2 size={16} />}>Share</MenuItem>
                      <MenuItem>Add to List</MenuItem>
                      <MenuItem>View Details</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};