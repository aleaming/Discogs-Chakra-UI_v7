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
} from '@chakra-ui/react';
import {
  MoreVertical,
  Library,
  Zap,
  List,
  DollarSign,
  Heart,
} from 'lucide-react';

interface MarketplaceAlbumBlockProps {
  title: string;
  artist: string;
  price: string;
  image: string;
  label?: string;
  releaseYear?: number;
}

export default function MarketplaceAlbumBlock({
  title,
  artist,
  price,
  image,
  label = 'Independent',
  releaseYear,
}: MarketplaceAlbumBlockProps) {
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
        colorScheme="green"
        position="absolute"
        top="0px"
        right="0px"
        zIndex="1"
      >
        For sale
      </Badge>
      <AspectRatio ratio={1}>
        <Image src={image} alt={`${title} Cover`} objectFit="cover" />
      </AspectRatio>

      <VStack padding="4" align="stretch" spacing="3">
        <VStack align="stretch" spacing="0">
          <Text fontSize="lg" fontWeight="700" color="gray.800" lineHeight="1">
            {title}
          </Text>
          <Link fontSize="sm" href="#" color="brand.500" fontWeight="700">
            {artist}
          </Link>
          <Text fontSize="sm" color="gray.600" lineHeight="1">
            2 x Vinyl, LP, Album, Stereo, 180 Gram
          </Text>
        </VStack>
        <VStack align="stretch" spacing="0">
          <Text fontSize="xs" color="gray.600">
            Media: Mint | Sleeve: Near Mint
          </Text>
          <Text fontSize="xs" color="gray.600">
            VinylPowerRecords (99% - 2,567 Ratings)
          </Text>
          <Text fontSize="xs" color="gray.600">
            Ships from: United States
          </Text>
        </VStack>
        <HStack>
          <Text fontSize="xl" fontWeight="700" color="brand.500">
            ${price} USD
          </Text>
          <Text fontSize="xs" color="gray.600">
            + $6.00 Shipping
          </Text>
        </HStack>

        <HStack spacing="2">
          <Button size="sm" colorScheme="brand" flex="1">
            Add to cart
          </Button>
          <Button size="sm" variant="outline" colorScheme="brand" flex="1">
            View item
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
}
