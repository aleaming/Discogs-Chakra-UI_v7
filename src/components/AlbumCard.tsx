import {
  Box,
  Image,
  VStack,
  Text,
  Link,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AspectRatio,
  Badge,
} from '@chakra-ui/react';
import {
  MoreVertical,
  Library,
  Zap,
  List,
  DollarSign,
  Heart,
} from 'lucide-react';

type AlbumProps = {
  title: string;
  artist: string;
  releaseYear: number;
  image: string;
};

const AlbumCard: React.FC<AlbumProps> = ({
  title,
  artist,
  releaseYear,
  image,
}) => {
  return (
    <Box
      width="full"
      borderRadius="lg"
      bg="white"
      overflow="hidden"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="gray.25"
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
      <AspectRatio ratio={1}>
        <Image src={image} alt={`${title} Cover`} objectFit="cover" />
      </AspectRatio>

      <VStack padding="4" align="stretch" spacing="3">
        <VStack align="stretch" spacing="1">
          <Text fontSize="lg" fontWeight="700" color="gray.800" lineHeight="1">
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
            Label: Virgin Records
          </Text>
          <Text fontSize="sm" color="gray.600">
            Released: {releaseYear}
          </Text>
        </VStack>
        <HStack>
          <Text fontSize="xl" fontWeight="700" color="brand.500">
            $34.99 USD
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
  );
};

export default AlbumCard;