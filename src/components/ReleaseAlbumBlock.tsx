import {
  Box,
  Text,
  Link,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  VStack,
  AspectRatio,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MoreVertical,
  Library,
  Zap,
  List,
  DollarSign,
  Heart,
} from 'lucide-react';
import { AlbumDetailsModal } from './AlbumDetailsModal';

interface ReleaseAlbumBlockProps {
  title: string;
  artist: string;
  price: string;
  image: string;
  label?: string;
  releaseYear?: number;
}

// Mock market stats data
const mockMarketStats = {
  lowestPrice: 29.99,
  medianPrice: 38.5,
  highestPrice: 89.99,
  totalSales: 1234,
  priceHistory: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    price: 35 + Math.random() * 10,
    volume: Math.floor(Math.random() * 50),
  })),
};

export default function ReleaseAlbumBlock({
  title,
  artist,
  price,
  image,
  label = 'Independent',
  releaseYear,
}: ReleaseAlbumBlockProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        width="full"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        borderWidth="1px"
        _dark={{ borderColor: 'var(--chakra-colors-gray-700)' }}
        _light={{ borderColor: 'white' }}
        transition="transform 0.2s"
        _hover={{ transform: 'translateY(-4px)' }}
        position="relative"
      >
        <Badge
          colorScheme="gray"
          position="absolute"
          top="0px"
          right="0px"
          zIndex="1"
        >
          Core Release
        </Badge>
        <AspectRatio ratio={1} onClick={onOpen} cursor="pointer">
          <Image
            src={image}
            alt={`${title} Cover`}
            objectFit="cover"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </AspectRatio>

        <VStack padding="4" align="stretch" spacing="3">
          <VStack align="stretch" spacing="1">
            <Text
              fontSize="lg"
              fontWeight="700"
              _dark={{ color: 'var(--chakra-colors-gray-25)' }}
              _light={{ color: 'gray.800' }}
              lineHeight="1"
            >
              {title}
            </Text>
            <Link href="#" color="brand.500" fontWeight="500">
              {artist}
            </Link>
          </VStack>
          <VStack align="stretch" spacing="0">
            <Text fontSize="sm" color="gray.600">
              Format: 2 x Vinyl, LP, Album, Stereo, 180 Gram
            </Text>
            <Text fontSize="sm" color="gray.600">
              Label: {label}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Released: {releaseYear}
            </Text>
          </VStack>
          <HStack>
            <Text fontSize="xl" fontWeight="700" color="brand.500">
              ${price} USD
            </Text>
            <Text fontSize="sm" color="gray.600">
              Median price
            </Text>
          </HStack>

          <HStack spacing="2">
            <Button size="sm" colorScheme="brand" flex="1">
              Shop
            </Button>
            <Button size="sm" variant="outline" colorScheme="brand" flex="1">
              View
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="outline"
                colorScheme="brand"
              >
                <MoreVertical size={16} />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<Library size={16} />}>
                  Add to Collection
                </MenuItem>
                <MenuItem icon={<Zap size={16} />}>Add to Wantlist</MenuItem>
                <MenuItem icon={<List size={16} />}>Add to List</MenuItem>
                <MenuItem icon={<DollarSign size={16} />}>Sell a copy</MenuItem>
                <MenuItem icon={<Heart size={16} />}>Follow artist</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </VStack>
      </Box>

      <AlbumDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        album={{
          title,
          artist,
          image,
          releaseYear: releaseYear || 2024,
          label,
          format: '2 x Vinyl, LP, Album, Stereo, 180 Gram',
          condition: {
            media: 'Mint',
            sleeve: 'Near Mint',
          },
          marketStats: mockMarketStats,
        }}
      />
    </>
  );
}
